// DO NOT EDIT! This is a generated sample ("Request",  "talent_delete_job")
'use strict';

// [START talent_delete_job]
// [START talent_delete_job_core]


const talent = require('@google-cloud/talent').v4beta1;

function sampleDeleteJob(projectId, jobId) {
  const client = new talent.JobServiceClient();
  // const projectId = 'Your Google Cloud Project ID';
  // const jobId = 'Company ID';
  const formattedName = client.jobPath(projectId, jobId);
  client.deleteJob({name: formattedName}).catch(err => {
    console.error(err);
  });
  console.log(`Deleted job.`);
}


// [END talent_delete_job_core]
// [END talent_delete_job]
// tslint:disable-next-line:no-any

const argv = require(`yargs`)
  .default('project_id', 'Your Google Cloud Project ID')
  .default('job_id', 'Company ID')
  .argv;

sampleDeleteJob(argv.project_id, argv.job_id);
