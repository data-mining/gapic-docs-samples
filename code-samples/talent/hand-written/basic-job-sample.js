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
const createAuthoredClientOpts = require('./create-authored-client-opts');
const talent = require('talent');

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT;

/**
 * This file contains the basic knowledge about job, including:
 *
 * - Construct a job with required fields
 *
 * - Create a job
 *
 * - Get a job
 *
 * - Delete a job
 */

// [START basic_job]

/**
 * Generate a basic job with given companyName.
 */
const generateJobWithRequiredFields = companyName => {
  const applicationUris = ['http://careers.google.com'];
  const description =
    'Design, develop, test, deploy, maintain and improve software.';
  const jobTitle = 'Software Engineer';
  const requisitionId = `jobWithRequiredFields:${new Date().getTime()}`;

  const job = {
    requisitionId: requisitionId,
    title: jobTitle,
    applicationInfo: {uris: applicationUris},
    description: description,
    companyName: companyName,
  };

  console.log(`Job generated: ${JSON.stringify(job)}`);
  return job;
};
// [END basic_job]

// [START create_job]

/**
 * Create a job.
 */
const createJob = async (jobServiceClient, jobToBeCreated) => {
  try {
    const request = {
      parent: jobServiceClient.projectPath(PROJECT_ID),
      job: jobToBeCreated,
    };

    const jobCreated = await jobServiceClient.createJob(request);

    console.log(`Job created: ${JSON.stringify(jobCreated[0])}`);
    return jobCreated[0];
  } catch (e) {
    console.error(`Got exception while creating job!`);
    throw e;
  }
};
// [END create_job]

// [START get_job]

/**
 * Get a job.
 */
const getJob = async (jobServiceClient, jobName) => {
  try {
    const request = {
      name: jobName,
    };

    const jobExisted = await jobServiceClient.getJob(request);

    console.log(`Job existed: ${JSON.stringify(jobExisted[0])}`);
    return jobExisted[0];
  } catch (e) {
    console.error('Got exception while getting job');
    throw e;
  }
};
// [END get_job]

// [START delete_job]

/**
 * Delete a job.
 */
const deleteJob = async (jobServiceClient, jobName) => {
  try {
    const request = {
      name: jobName,
    };

    await jobServiceClient.deleteJob(request);
    console.log('Job deleted');
  } catch (e) {
    console.error('Got exception while deleting job');
    throw e;
  }
};
// [END delete_job]

// [START batch_delete_job]

/**
 * Delete a job.
 */
const batchDeleteJobs = async (jobServiceClient, filter) => {
  try {
    const request = {
      parent: jobServiceClient.projectPath(PROJECT_ID),
      filter: filter,
    };

    await jobServiceClient.batchDeleteJobs(request);
    console.log('Batch delete jobs successfully');
  } catch (e) {
    console.error('Got exception while deleting job');
    throw e;
  }
};
// [END batch_delete_job]

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

    // Create a company before creating jobs
    const companyToBeCreated = basicCompanySample.generateCompany();
    const companyCreated = await basicCompanySample.createCompany(
      companyServiceClient,
      companyToBeCreated
    );
    const companyName = companyCreated.name;

    // Construct a job
    const jobToBeCreated = generateJobWithRequiredFields(companyName);

    // Create a job
    const jobCreated = await createJob(jobServiceClient, jobToBeCreated);

    // Get a job
    const jobName = jobCreated.name;
    await getJob(jobServiceClient, jobName);

    // Delete a job
    await deleteJob(jobServiceClient, jobName);

    // Construct two jobs with same company name
    const jobToBeCreated1 = generateJobWithRequiredFields(companyName);
    await createJob(jobServiceClient, jobToBeCreated1);

    // Batch delete jobs
    const requisitionId = jobToBeCreated1.requisitionId;
    // Note both companyName and requisitionId are required.
    const filter = `companyName = "${companyName}" AND requisitionId = "${requisitionId}"`;
    await batchDeleteJobs(jobServiceClient, filter);

    // Delete company only after cleaning all jobs under this company
    await basicCompanySample.deleteCompany(companyServiceClient, companyName);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = {
  generateJobWithRequiredFields: generateJobWithRequiredFields,
  createJob: createJob,
  deleteJob: deleteJob,
  runSample: runSample,
};
