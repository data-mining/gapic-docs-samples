// DO NOT EDIT! This is a generated sample ("Request",  "language_classify_gcs")
'use strict';

// [START language_classify_gcs]
// [START language_classify_gcs_core]


const language = require('@google-cloud/language').v1;

function sampleClassifyText(gcsUri) {
  const client = new language.LanguageServiceClient();
  // const gcsUri = 'gs://cloud-samples-data/language/classify-entertainment.txt';
  const type = 'PLAIN_TEXT';
  const document = {
    type: type,
    gcsContentUri: gcsUri,
  };
  client.classifyText({document: document})
    .then(responses => {
      const response = responses[0];
      for (const category of response.categories) {
        console.log(`Category name: ${category.name}`);
        console.log(`Confidence: ${category.confidence}`);
      }
    })
    .catch(err => {
      console.error(err);
    });
}


// [END language_classify_gcs_core]
// tslint:disable-next-line:no-any
// [END language_classify_gcs]

const argv = require(`yargs`)
  .default('gcs_uri', 'gs://cloud-samples-data/language/classify-entertainment.txt')
  .argv;

sampleClassifyText(argv.gcs_uri);
