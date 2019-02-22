// DO NOT EDIT! This is a generated sample ("Request",  "language_entity_sentiment_gcs")
'use strict';

// [START language_entity_sentiment_gcs]
// [START language_entity_sentiment_gcs_core]


const language = require('@google-cloud/language').v1;

function sampleAnalyzeEntitySentiment(gcsUri) {
  const client = new language.LanguageServiceClient();
  // const gcsUri = 'gs://cloud-samples-data/language/entity-sentiment.txt';
  const type = 'PLAIN_TEXT';
  const document = {
    type: type,
    gcsContentUri: gcsUri,
  };
  client.analyzeEntitySentiment({document: document})
    .then(responses => {
      const response = responses[0];
      for (const entity of response.entities) {
        console.log(`Entity name: ${entity.name}`);
        console.log(`Entity sentiment score: ${entity.sentiment.score}`);
        for (const mention of entity.mentions) {
          console.log(`Mention: ${mention.text.content}`);
          console.log(`Mention type: ${mention.type}`);
          console.log(`Mention sentiment score: ${mention.sentiment.score}`);
          console.log(`Mention sentiment magnitude: ${mention.sentiment.magnitude}`);
        }
      }
    })
    .catch(err => {
      console.error(err);
    });
}


// [END language_entity_sentiment_gcs_core]
// tslint:disable-next-line:no-any
// [END language_entity_sentiment_gcs]

const argv = require(`yargs`)
  .default('gcs_uri', 'gs://cloud-samples-data/language/entity-sentiment.txt')
  .argv;

sampleAnalyzeEntitySentiment(argv.gcs_uri);
