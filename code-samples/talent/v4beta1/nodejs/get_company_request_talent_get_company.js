// DO NOT EDIT! This is a generated sample ("Request",  "talent_get_company")
'use strict';

// [START talent_get_company]
// [START talent_get_company_core]


const talent = require('@google-cloud/talent').v4beta1;

function sampleGetCompany(projectId, companyId) {
  const client = new talent.CompanyServiceClient();
  // const projectId = 'Your Google Cloud Project ID';
  // const companyId = 'Company ID';
  const formattedName = client.companyPath(projectId, companyId);
  client.getCompany({name: formattedName})
    .then(responses => {
      const response = responses[0];
      console.log(`Company name: ${response.name}`);
      console.log(`Display name: ${response.displayName}`);
    })
    .catch(err => {
      console.error(err);
    });
}


// [END talent_get_company_core]
// [END talent_get_company]
// tslint:disable-next-line:no-any

const argv = require(`yargs`)
  .default('project_id', 'Your Google Cloud Project ID')
  .default('company_id', 'Company ID')
  .argv;

sampleGetCompany(argv.project_id, argv.company_id);
