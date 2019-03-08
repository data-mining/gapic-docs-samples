// DO NOT EDIT! This is a generated sample ("RequestAsyncPagedAll",  "talent_list_companies")
'use strict';

// [START talent_list_companies]
// [START talent_list_companies_core]


const talent = require('@google-cloud/talent').v4beta1;

function sampleListCompanies(projectId) {
  const client = new talent.CompanyServiceClient();
  // Iterate over all elements.
  // const projectId = 'Your Google Cloud Project ID';
  const formattedParent = client.projectPath(projectId);

  client.listCompanies({parent: formattedParent})
    .then(responses => {
      const resources = responses[0];
      for (const resource of resources) {
        console.log(`Company: ${resource.name}`);
        console.log(`Display name: ${resource.displayName}`);
        console.log(`External ID: ${resource.externalId}`);
      }
    })
    .catch(err => {
      console.error(err);
    });
}


// [END talent_list_companies_core]
// [END talent_list_companies]
// tslint:disable-next-line:no-any

const argv = require(`yargs`)
  .default('project_id', 'Your Google Cloud Project ID')
  .argv;

sampleListCompanies(argv.project_id);