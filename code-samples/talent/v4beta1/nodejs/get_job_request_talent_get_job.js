// DO NOT EDIT! This is a generated sample ("Request",  "talent_get_job")
'use strict';

// [START talent_get_job]
// [START talent_get_job_core]


const talent = require('@google-cloud/talent').v4beta1;

function sampleGetJob() {
  const client = new talent.JobServiceClient();
  const formattedName = client.jobPath('[PROJECT]', '[JOBS]');
  client.getJob({name: formattedName})
    .then(responses => {
      const response = responses[0];
      console.log(response);
    })
    .catch(err => {
      console.error(err);
    });
}


// [END talent_get_job_core]
// [END talent_get_job]
// tslint:disable-next-line:no-any

sampleGetJob();
