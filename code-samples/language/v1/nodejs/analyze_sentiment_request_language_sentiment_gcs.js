// DO NOT EDIT! This is a generated sample ("Request",  "language_sentiment_gcs")
'use strict';

HELLO I CHANGED A THING!

// [START language_sentiment_gcs]
// [START language_sentiment_gcs_core]


const language = require('@google-cloud/language').v1;

function sampleAnalyzeSentiment(gcsUri) {
  const client = new language.LanguageServiceClient();
  // const gcsUri = 'gs://cloud-samples-data/language/sentiment-positive.txt';
  const type = 'PLAIN_TEXT';
  const document = {
    type: type,
    gcsContentUri: gcsUri,
  };
  client.analyzeSentiment({document: document})
    .then(responses => {
      const response = responses[0];
      const sentiment = response.documentSentiment;
      console.log(`Sentiment score: ${sentiment.score}`);
      console.log(`Magnitude: ${sentiment.magnitude}`);
    })
    .catch(err => {
      console.error(err);
    });
}


// [END language_sentiment_gcs_core]
// tslint:disable-next-line:no-any
// [END language_sentiment_gcs]

const argv = require(`yargs`)
  .default('gcs_uri', 'gs://cloud-samples-data/language/sentiment-positive.txt')
  .argv;

sampleAnalyzeSentiment(argv.gcs_uri);
