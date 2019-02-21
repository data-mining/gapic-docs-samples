/**
 * Copyright 2018, Google, LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// [START report_client_event]

const basicCompanySample = require(`./basic-company-sample`);
const basicJobSample = require(`./basic-job-sample`);
const autoCompleteSample = require(`./auto-complete-sample`);
const createAuthoredClientOpts = require('./create-authored-client-opts');
const talent = require('talent');

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT;

/**
 * Generate a basic job with given companyName.
 */
const generateJobEvent = (requestId, jobs) => {
  const eventId = `event-${new Date().getTime()}`;
  const jobEvent = {
    jobs: jobs,
    type: 'VIEW',
  };

  const event = {
    requestId: requestId,
    eventId: eventId,
    jobEvent: jobEvent,
    createTime: {seconds: new Date().getSeconds()},
  };

  console.log(`Job generated: ${JSON.stringify(event)}`);
  return event;
};

// [START report_event]

/**
 * Report a event.
 */
const reportEvent = async (eventServiceClient, jobEventToBeReported) => {
  try {
    const request = {
      parent: eventServiceClient.projectPath(PROJECT_ID),
      clientEvent: jobEventToBeReported,
    };

    const eventReported = await eventServiceClient.createClientEvent(request);

    console.log(`Event Reported: ${JSON.stringify(eventReported[0])}`);
  } catch (e) {
    console.error(`Got exception while creating job!`);
    throw e;
  }
};
// [END report_event]

// Lists report_client_event
(async () => {
  try {
    // Create an authorized company service client
    const authoredClientOpts = await createAuthoredClientOpts();
    const companyServiceClient = new talent.v4beta1.CompanyServiceClient(
      authoredClientOpts
    );
    const jobServiceClient = new talent.v4beta1.JobServiceClient(
      authoredClientOpts
    );
    const eventServiceClient = new talent.v4beta1.EventServiceClient(
      authoredClientOpts
    );
    const completionClient = new talent.v4beta1.CompletionClient(
      authoredClientOpts
    );

    // Create a company
    const companyToBeCreated = basicCompanySample.generateCompany();
    const companyCreated = await basicCompanySample.createCompany(
      companyServiceClient,
      companyToBeCreated
    );
    const companyName = companyCreated.name;

    // Create a job
    const jobToBeCreated = basicJobSample.generateJobWithRequiredFields(
      companyName
    );
    jobToBeCreated.title = 'Software engineer';
    const jobCreated = await basicJobSample.createJob(
      jobServiceClient,
      jobToBeCreated
    );
    const jobName = jobCreated.name;

    const result = await autoCompleteSample.jobTitleAutoComplete(
      completionClient,
      'sof',
      companyName
    );

    const requestId = result.metadata.requestId;
    // report event
    const jobEventToBeReported = generateJobEvent(requestId, [jobName]);
    await reportEvent(eventServiceClient, jobEventToBeReported);

    // Delete job and company
    await basicJobSample.deleteJob(jobServiceClient, jobName);
    await basicCompanySample.deleteCompany(companyServiceClient, companyName);
  } catch (e) {
    console.error(e);
    throw e;
  }
})();
// [END report_client_event]
