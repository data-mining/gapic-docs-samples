// DO NOT EDIT! This is a generated sample ("RequestAsyncPagedAll",  "talent_list_jobs")
'use strict';

// [START talent_list_jobs]
// [START talent_list_jobs_core]


const talent = require('@google-cloud/talent').v4beta1;

function sampleListJobs(projectId, filter) {
  const client = new talent.JobServiceClient();
  // Iterate over all elements.
  // const projectId = 'Your Google Cloud Project ID';
  // const filter = 'companyName=projects/my-project/companies/company-id';
  const formattedParent = client.projectPath(projectId);
  const request = {
    parent: formattedParent,
    filter: filter,
  };

  client.listJobs(request)
    .then(responses => {
      const resources = responses[0];
      for (const resource of resources) {
        console.log(`Job name: ${resource.name}`);
        console.log(`Job title: ${resource.title}`);
      }
    })
    .catch(err => {
      console.error(err);
    });
}


// [END talent_list_jobs_core]
// [END talent_list_jobs]
// tslint:disable-next-line:no-any

const argv = require(`yargs`)
  .default('project_id', 'Your Google Cloud Project ID')
  .default('filter', 'companyName=projects/my-project/companies/company-id')
  .argv;

sampleListJobs(argv.project_id, argv.filter);
