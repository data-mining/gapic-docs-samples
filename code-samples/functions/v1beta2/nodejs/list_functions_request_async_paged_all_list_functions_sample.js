// DO NOT EDIT! This is a generated sample ("RequestAsyncPagedAll",  "list_functions_sample")
'use strict';

// [START list_functions_sample]
// [START list_functions_sample_core]


const functions = require('@google-cloud/functions').v1beta2;

function sampleListFunctions(projectId, locationName) {
  const client = new functions.CloudFunctionsServiceClient();
  // Iterate over all elements.
  // const projectId = 'Your Google Cloud Project ID';
  // const locationName = 'us-central1';
  const formattedLocation = client.locationPath(projectId, locationName);

  client.listFunctions({location: formattedLocation})
    .then(responses => {
      const resources = responses[0];
      for (const resource of resources) {
        const function_ = resource;
        console.log(`Function name: ${function_.name}`);
      }
    })
    .catch(err => {
      console.error(err);
    });
}


// [END list_functions_sample_core]
// tslint:disable-next-line:no-any
// [END list_functions_sample]

const argv = require(`yargs`)
  .default('project_id', 'Your Google Cloud Project ID')
  .default('location_name', 'us-central1')
  .argv;

sampleListFunctions(argv.project_id, argv.location_name);
