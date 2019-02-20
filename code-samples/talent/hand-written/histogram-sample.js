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
 * The sample in this file introduce how to do a histogram search.
 */

// [START histogram_search]

/**
 * Generate a job with a custom attribute.
 */
const generateJobWithACustomAttribute = companyName => {
  const requisitionId = `"jobWithACustomAttribute: ${new Date().getTime()}}`;
  const jobTitle = 'Software Engineer';
  const applicationUrls = ['http://careers.google.com'];
  const description =
    'Design, develop, test, deploy, maintain and improve software.';

  const customAttributes = {
    someFieldName1: {stringValues: ['value1'], filterable: true},
    someFieldName2: {longValues: [256], filterable: true},
  };

  const job = {
    companyName: companyName,
    requisitionId: requisitionId,
    title: jobTitle,
    applicationInfo: {uris: applicationUrls},
    description: description,
    customAttributes: customAttributes,
  };

  console.log(`Job generated: ${JSON.stringify(job)}`);
  return job;
};

/**
 * Histogram search
 */
const histogramSearch = async (jobServiceClient, companyName) => {
  try {
    const requestMetadata = {
      userId: 'HashedUserId',
      sessionId: 'HashedSessionId',
      domain: 'www.google.com',
    };

    const histogramQueries = [
      {histogramQuery: 'count(company_id)'},
      {histogramQuery: 'count(string_custom_attribute["someFieldName1"])'},
    ];

    const request = {
      parent: jobServiceClient.projectPath(PROJECT_ID),
      searchMode: 'JOB_SEARCH',
      requestMetadata: requestMetadata,
      histogramQueries: histogramQueries,
    };

    if (companyName) {
      request.jobQuery = {companyNames: [companyName]};
    }

    const result = await jobServiceClient.searchJobs(request);

    console.log(`Histogram search results are: ${JSON.stringify(result[0])}`);
  } catch (e) {
    console.error(e);
    throw e;
  }
};
// [END histogram_search]

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
    const jobToBeCreated = generateJobWithACustomAttribute(companyName);
    const jobCreated = await basicJobSample.createJob(
      jobServiceClient,
      jobToBeCreated
    );
    const jobName = jobCreated.name;

    // Wait several seconds for post processing
    await sleep(10000);

    // Commute search
    await histogramSearch(jobServiceClient, companyName);

    // Delete job and company
    await basicJobSample.deleteJob(jobServiceClient, jobName);
    await basicCompanySample.deleteCompany(companyServiceClient, companyName);
  } catch (e) {
    console.log(e);
    throw e;
  }
})();
