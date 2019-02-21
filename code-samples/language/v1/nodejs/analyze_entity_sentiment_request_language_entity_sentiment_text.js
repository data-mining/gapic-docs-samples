// DO NOT EDIT! This is a generated sample ("Request",  "language_entity_sentiment_text")
'use strict';

HELLO I CHANGED A THING!

// [START language_entity_sentiment_text]
// [START language_entity_sentiment_text_core]


const language = require('@google-cloud/language').v1;

function sampleAnalyzeEntitySentiment(textContent) {
  const client = new language.LanguageServiceClient();
  // const textContent = 'Grapes are good. Bananas are bad.';
  const type = 'PLAIN_TEXT';
  const document = {
    type: type,
    content: textContent,
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


// [END language_entity_sentiment_text_core]
// tslint:disable-next-line:no-any
// [END language_entity_sentiment_text]

const argv = require(`yargs`)
  .default('text_content', 'Grapes are good. Bananas are bad.')
  .argv;

sampleAnalyzeEntitySentiment(argv.text_content);
