// DO NOT EDIT! This is a generated sample ("RequestAsyncPaged",  "talent_list_companies")
'use strict';

// [START talent_list_companies]
// [START talent_list_companies_core]


const talent = require('@google-cloud/talent').v4beta1;

function sampleListCompanies(projectId) {
  const client = new talent.CompanyServiceClient();
  // Or obtain the paged response.
  // const projectId = 'Your Google Cloud Project ID';
  const formattedParent = client.projectPath(projectId);


  const options = {autoPaginate: false};
  const callback = responses => {
    // The actual resources in a response.
    const resources = responses[0];
    // The next request if the response shows that there are more responses.
    const nextRequest = responses[1];
    // The actual response object, if necessary.
    // const rawResponse = responses[2];
    for (const resource of resources) {
      console.log(`Company: ${resource.name}`);
      console.log(`Display name: ${resource.displayName}`);
      console.log(`External ID: ${resource.externalId}`);
    }
    if (nextRequest) {
      // Fetch the next page.
      return client.listCompanies(nextRequest, options).then(callback);
    }
  }
  client.listCompanies({parent: formattedParent}, options)
    .then(callback)
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