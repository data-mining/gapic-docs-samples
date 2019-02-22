// DO NOT EDIT! This is a generated sample ("Request",  "language_entities_text")
'use strict';

// [START language_entities_text]
// [START language_entities_text_core]


const language = require('@google-cloud/language').v1;

function sampleAnalyzeEntities(textContent) {
  const client = new language.LanguageServiceClient();
  // const textContent = 'California is a state.';
  const type = 'PLAIN_TEXT';
  const document = {
    type: type,
    content: textContent,
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


// [END language_entities_text_core]
// tslint:disable-next-line:no-any
// [END language_entities_text]

const argv = require(`yargs`)
  .default('text_content', 'California is a state.')
  .argv;

sampleAnalyzeEntities(argv.text_content);
