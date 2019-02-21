// DO NOT EDIT! This is a generated sample ("Request",  "language_sentiment_text")
'use strict';

HELLO I CHANGED A THING!

// [START language_sentiment_text]
// [START language_sentiment_text_core]


const language = require('@google-cloud/language').v1;

function sampleAnalyzeSentiment(textContent) {
  const client = new language.LanguageServiceClient();
  // const textContent = 'I am so happy and joyful.';
  const type = 'PLAIN_TEXT';
  const document = {
    type: type,
    content: textContent,
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


// [END language_sentiment_text_core]
// tslint:disable-next-line:no-any
// [END language_sentiment_text]

const argv = require(`yargs`)
  .default('text_content', 'I am so happy and joyful.')
  .argv;

sampleAnalyzeSentiment(argv.text_content);
