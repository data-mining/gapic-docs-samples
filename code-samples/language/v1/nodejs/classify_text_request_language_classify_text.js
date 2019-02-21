// DO NOT EDIT! This is a generated sample ("Request",  "language_classify_text")
'use strict';

// [START language_classify_text]
// [START language_classify_text_core]


const language = require('@google-cloud/language').v1;

function sampleClassifyText(textContent) {
  const client = new language.LanguageServiceClient();
  // const textContent = 'This is about film and movies and television and acting and movie theatres and theatre and drama and entertainment and the arts.';
  const type = 'PLAIN_TEXT';
  const document = {
    type: type,
    content: textContent,
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


// [END language_classify_text_core]
// tslint:disable-next-line:no-any
// [END language_classify_text]

const argv = require(`yargs`)
  .default('text_content', 'This is about film and movies and television and acting and movie theatres and theatre and drama and entertainment and the arts.')
  .argv;

sampleClassifyText(argv.text_content);
