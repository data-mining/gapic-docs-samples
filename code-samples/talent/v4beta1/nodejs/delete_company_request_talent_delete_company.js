// DO NOT EDIT! This is a generated sample ("Request",  "talent_delete_company")
'use strict';

// [START talent_delete_company]
// [START talent_delete_company_core]


const talent = require('@google-cloud/talent').v4beta1;

function sampleDeleteCompany(projectIdChanged, companyIdChanged) {
  const client = new talent.CompanyServiceClient();
  // const projectIdChanged = 'Your Google Cloud Project ID CHANGED';
  // const companyIdChanged = 'ID of the company to delete';
  const formattedName = client.companyPath(projectIdChanged, companyIdChanged);
  client.deleteCompany({name: formattedName}).catch(err => {
    console.error(err);
  });
}


// [END talent_delete_company_core]
// tslint:disable-next-line:no-any
// [END talent_delete_company]

const argv = require(`yargs`)
  .default('project_id_changed', 'Your Google Cloud Project ID CHANGED')
  .default('company_id_changed', 'ID of the company to delete')
  .argv;

sampleDeleteCompany(argv.project_id_changed, argv.company_id_changed);
