// DO NOT EDIT! This is a generated sample ("Request",  "talent_delete_company")
'use strict';

// [START talent_delete_company]
// [START talent_delete_company_core]


const talent = require('@google-cloud/talent').v4beta1;

function sampleDeleteCompany(projectId, companyId) {
  const client = new talent.CompanyServiceClient();
  // const projectId = 'Your Google Cloud Project ID';
  // const companyId = 'ID of the company to delete';
  const formattedName = client.companyPath(projectId, companyId);
  client.deleteCompany({name: formattedName}).catch(err => {
    console.error(err);
  });
}


// [END talent_delete_company_core]
// tslint:disable-next-line:no-any
// [END talent_delete_company]

const argv = require(`yargs`)
  .default('project_id', 'Your Google Cloud Project ID')
  .default('company_id', 'ID of the company to delete')
  .argv;

sampleDeleteCompany(argv.project_id, argv.company_id);
