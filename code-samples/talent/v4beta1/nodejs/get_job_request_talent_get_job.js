// DO NOT EDIT! This is a generated sample ("Request",  "talent_get_job")
'use strict';

// [START talent_get_job]
// [START talent_get_job_core]


const talent = require('@google-cloud/talent').v4beta1;

function sampleGetJob(projectId, jobId) {
  const client = new talent.JobServiceClient();
  // const projectId = 'Your Google Cloud Project ID';
  // const jobId = 'Job ID';
  const formattedName = client.jobPath(projectId, jobId);
  client.getJob({name: formattedName})
    .then(responses => {
      const response = responses[0];
      console.log(`Job name: ${response.name}`);
      console.log(`Requisition ID: ${response.requisitionId}`);
      console.log(`Title: ${response.title}`);
      console.log(`Description: ${response.description}`);
      console.log(`Posting language: ${response.languageCode}`);
      for (const address of response.addresses) {
        console.log(`Address: ${address}`);
      }
      for (const email of response.applicationInfo.emails) {
        console.log(`Email: ${email}`);
      }
      for (const websiteUri of response.applicationInfo.uris) {
        console.log(`Website: ${websiteUri}`);
      }
    })
    .catch(err => {
      console.error(err);
    });
}


// [END talent_get_job_core]
// [END talent_get_job]
// tslint:disable-next-line:no-any

const argv = require(`yargs`)
  .default('project_id', 'Your Google Cloud Project ID')
  .default('job_id', 'Job ID')
  .argv;

sampleGetJob(argv.project_id, argv.job_id);
