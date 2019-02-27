// DO NOT EDIT! This is a generated sample ("RequestAsyncPaged",  "list_functions_sample")
'use strict';

// [START list_functions_sample]
// [START list_functions_sample_core]


const functions = require('@google-cloud/functions').v1beta2;

function sampleListFunctions(projectId, locationName) {
  const client = new functions.CloudFunctionsServiceClient();
  // Or obtain the paged response.
  // const projectId = 'Your Google Cloud Project ID';
  // const locationName = 'us-central1';
  const formattedLocation = client.locationPath(projectId, locationName);


  const options = {autoPaginate: false};
  const callback = responses => {
    // The actual resources in a response.
    const resources = responses[0];
    // The next request if the response shows that there are more responses.
    const nextRequest = responses[1];
    // The actual response object, if necessary.
    // const rawResponse = responses[2];
    for (const resource of resources) {
      const function_ = resource;
      console.log(`Function name: {$function_.name}`);
    }
    if (nextRequest) {
      // Fetch the next page.
      return client.listFunctions(nextRequest, options).then(callback);
    }
  }
  client.listFunctions({location: formattedLocation}, options)
    .then(callback)
    .catch(err => {
      console.error(err);
    });
}


// [END list_functions_sample_core]
// tslint:disable-next-line:no-any
// [END list_functions_sample]

argv = require(`yargs`)
  .default('project_id', 'Your Google Cloud Project ID')
  .default('location_name', 'us-central1')
  .argv;

sampleListFunctions(argv.project_id, argv.location_name);