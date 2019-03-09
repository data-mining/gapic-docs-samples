// DO NOT EDIT! This is a generated sample ("Request",  "talent_create_job")
'use strict';

// [START talent_create_job]
// [START talent_create_job_core]


const talent = require('@google-cloud/talent').v4beta1;

function sampleCreateJob(projectId, requisitionId, title, description, jobApplicationUrl, addressOne, addressTwo, languageCode) {
  const client = new talent.JobServiceClient();
  // const projectId = 'Your Google Cloud Project ID';
  // const requisitionId = 'Job requisition ID, aka Posting ID. Unique per job.';
  // const title = 'Software Engineer';
  // const description = 'This is a description of this <i>wonderful</i> job!';
  // const jobApplicationUrl = 'https://www.example.org/job-posting/123';
  // const addressOne = '1600 Amphitheatre Parkway, Mountain View, CA 94043';
  // const addressTwo = '111 8th Avenue, New York, NY 10011';
  // const languageCode = 'en-US';
  const formattedParent = client.projectPath(projectId);
  const uris = [jobApplicationUrl];
  const applicationInfo = {
    uris: uris,
  };
  const addresses = [addressOne, addressTwo];
  const job = {
    requisitionId: requisitionId,
    title: title,
    description: description,
    applicationInfo: applicationInfo,
    addresses: addresses,
    languageCode: languageCode,
  };
  const request = {
    parent: formattedParent,
    job: job,
  };
  client.createJob(request)
    .then(responses => {
      const response = responses[0];
      console.log(`Created job: ${response.name}`);
    })
    .catch(err => {
      console.error(err);
    });
}


// [END talent_create_job_core]
// [END talent_create_job]
// tslint:disable-next-line:no-any

const argv = require(`yargs`)
  .default('project_id', 'Your Google Cloud Project ID')
  .default('requisition_id', 'Job requisition ID, aka Posting ID. Unique per job.')
  .default('title', 'Software Engineer')
  .default('description', 'This is a description of this <i>wonderful</i> job!')
  .default('job_application_url', 'https://www.example.org/job-posting/123')
  .default('address_one', '1600 Amphitheatre Parkway, Mountain View, CA 94043')
  .default('address_two', '111 8th Avenue, New York, NY 10011')
  .default('language_code', 'en-US')
  .argv;

sampleCreateJob(argv.project_id, argv.requisition_id, argv.title, argv.description, argv.job_application_url, argv.address_one, argv.address_two, argv.language_code);
