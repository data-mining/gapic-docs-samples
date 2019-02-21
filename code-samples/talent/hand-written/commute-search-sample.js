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
const sleep = require('./sleep');

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT;

/**
 * The samples in this file introduce how to do a commute search.
 *
 * Note: Commute Search is different from location search. It only take latitude and longitude as
 * the start location.
 */

// [START commute_search]
const commuteSearch = async (jobServiceClient, companyName) => {
  try {
    const requestMetadata = {
      userId: 'HashedUserId',
      sessionId: 'HashedSessionId',
      domain: 'www.google.com',
    };

    const startLocation = {
      latitude: 37.422408,
      longitude: -122.085609,
    };

    const commutePreference = {
      roadTraffic: 'TRAFFIC_FREE',
      commuteMethod: 'TRANSIT',
      travelDuration: {seconds: '1000'},
      startCoordinates: startLocation,
    };

    const jobQuery = {
      commuteFilter: commutePreference,
    };

    if (companyName) {
      jobQuery.companyNames = [companyName];
    }

    const request = {
      parent: jobServiceClient.projectPath(PROJECT_ID),
      jobQuery: jobQuery,
      requestMetadata: requestMetadata,
      jobView: 'JOB_VIEW_FULL',
      requirePreciseResultSize: true,
    };

    const result = await jobServiceClient.searchJobs(request);

    console.log(`Commute search results are: ${JSON.stringify(result)}`);
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
// [END commute_search]

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
    jobToBeCreated.addresses = [
      '1600 Amphitheatre Parkway, Mountain View, CA 94043',
    ];
    const jobCreated = await basicJobSample.createJob(
      jobServiceClient,
      jobToBeCreated
    );
    const jobName = jobCreated.name;

    // Wait several seconds for post processing
    await sleep(10000);

    // Commute search
    await commuteSearch(jobServiceClient, companyName);

    // Delete job and company
    await basicJobSample.deleteJob(jobServiceClient, jobName);
    await basicCompanySample.deleteCompany(companyServiceClient, companyName);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = {
  commuteSearch: commuteSearch,
  runSample: runSample,
};
