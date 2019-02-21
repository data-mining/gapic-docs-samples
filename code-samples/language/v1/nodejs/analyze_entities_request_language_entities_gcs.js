// DO NOT EDIT! This is a generated sample ("Request",  "language_entities_gcs")
'use strict';

HELLO I CHANGED A THING!

// [START language_entities_gcs]
// [START language_entities_gcs_core]


const language = require('@google-cloud/language').v1;

function sampleAnalyzeEntities(gcsUri) {
  const client = new language.LanguageServiceClient();
  // const gcsUri = 'gs://cloud-samples-data/language/entity.txt';
  const type = 'PLAIN_TEXT';
  const document = {
    type: type,
    gcsContentUri: gcsUri,
  };
  client.analyzeEntities({document: document})
    .then(responses => {
      const response = responses[0];
      for (const entity of response.entities) {
        console.log(`Entity name: ${entity.name}`);
        console.log(`Entity type: ${entity.type}`);
        console.log(`Entity salience score: ${entity.salience}`);
        for (const mention of entity.mentions) {
          console.log(`Mention: ${mention.text.content}`);
          console.log(`Mention type: ${mention.type}`);
        }
      }
    })
    .catch(err => {
      console.error(err);
    });
}


// [END language_entities_gcs_core]
// tslint:disable-next-line:no-any
// [END language_entities_gcs]

const argv = require(`yargs`)
  .default('gcs_uri', 'gs://cloud-samples-data/language/entity.txt')
  .argv;

sampleAnalyzeEntities(argv.gcs_uri);
