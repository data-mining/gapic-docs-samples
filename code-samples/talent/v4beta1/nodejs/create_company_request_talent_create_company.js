// DO NOT EDIT! This is a generated sample ("Request",  "talent_create_company")
'use strict';

// [START talent_create_company]
// [START talent_create_company_core]


const talent = require('@google-cloud/talent').v4beta1;

function sampleCreateCompany(projectId, displayName, externalId) {
  const client = new talent.CompanyServiceClient();
  // const projectId = 'Your Google Cloud Project ID';
  // const displayName = 'My Company Name';
  // const externalId = 'Identifier of this company in my system';
  const formattedParent = client.projectPath(projectId);
  const company = {
    displayName: displayName,
    externalId: externalId,
  };
  const request = {
    parent: formattedParent,
    company: company,
  };
  client.createCompany(request)
    .then(responses => {
      const response = responses[0];
      console.log(`Created company: ${response.displayName}`);
      console.log(`Company name: ${response.name}`);
    })
    .catch(err => {
      console.error(err);
    });
}


// [END talent_create_company_core]
// tslint:disable-next-line:no-any
// [END talent_create_company]

const argv = require(`yargs`)
  .default('project_id', 'Your Google Cloud Project ID')
  .default('display_name', 'My Company Name')
  .default('external_id', 'Identifier of this company in my system')
  .argv;

sampleCreateCompany(argv.project_id, argv.display_name, argv.external_id);
