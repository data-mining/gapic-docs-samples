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

const basicCompanySample = require(`./basic-company-sample`);
const basicJobSample = require(`./basic-job-sample`);
const createAuthoredClientOpts = require('./create-authored-client-opts');
const talent = require('talent');

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT;

/**
 * The samples in this file introduced how to do the auto complete, including:
 *
 * - Default auto complete (on both company display name and job title)
 *
 * - Auto complete on job title only
 */

//[START auto_complete_job_title]

/**
 * Auto completes job titles within given companyName.
 */
const jobTitleAutoComplete = async (completionClient, query, companyName) => {
  try {
    const request = {
      name: completionClient.projectPath(PROJECT_ID),
      query: query,
      languageCode: ['en-US'],
      type: 'JOB_TITLE',
      pageSize: 10,
    };

    if (companyName) {
      request.companyName = companyName;
    }

    const complete = await completionClient.completeQuery(request);

    console.log(
      `Job tile auto complete result is: ${JSON.stringify(complete[0])}`
    );
    return complete[0];
  } catch (e) {
    console.error(e);
    throw e;
  }
};
// [END auto_complete_job_title]

// Run Sample
const runSample = async () => {
  try {
    // Create an authorized company service client
    const authoredClientOpts = await createAuthoredClientOpts();
    const companyServiceClient = new talent.v4beta1.CompanyServiceClient(
      authoredClientOpts
    );
    const jobServiceClient = new talent.v4beta1.JobServiceClient(
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

    await jobTitleAutoComplete(completionClient, 'sof', companyName);

    // Delete job and company
    await basicJobSample.deleteJob(jobServiceClient, jobName);
    await basicCompanySample.deleteCompany(companyServiceClient, companyName);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

module.exports = {
  jobTitleAutoComplete: jobTitleAutoComplete,
};
