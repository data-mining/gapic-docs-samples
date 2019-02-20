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
 * The samples in this file introduce how to do a custom ranking search.
 */

// [START custom_ranking_search]
const customRankingSearch = async jobServiceClient => {
  try {
    const requestMetadata = {
      userId: 'HashedUserId',
      sessionId: 'HashedSessionId',
      domain: 'www.google.com',
    };

    const customRankingInfo = {
      importanceLevel: 'EXTREME',
      rankingExpression: 'someFieldName2 / 2 - someFieldName3',
    };

    const request = {
      parent: jobServiceClient.projectPath(PROJECT_ID),
      requestMetadata: requestMetadata,
      searchMode: 'JOB_SEARCH',
      orderBy: 'custom_ranking desc',
      jobView: 'JOB_VIEW_FULL',
      customRankingInfo: customRankingInfo,
    };

    const result = await jobServiceClient.searchJobs(request);

    console.log(
      `Custom ranking search results are: ${JSON.stringify(result[0])}`
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
};
// [END custom_ranking_search]

// Run Sample
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
    await customRankingSearch(jobServiceClient);

    // Delete job and company
    await basicJobSample.deleteJob(jobServiceClient, jobName);
    await basicCompanySample.deleteCompany(companyServiceClient, companyName);
  } catch (e) {
    console.log(e);
    throw e;
  }
})();
