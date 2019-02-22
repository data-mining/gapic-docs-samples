// DO NOT EDIT! This is a generated sample ("Request",  "language_syntax_text")
'use strict';

// [START language_syntax_text]
// [START language_syntax_text_core]


const language = require('@google-cloud/language').v1;

function sampleAnalyzeSyntax(textContent) {
  const client = new language.LanguageServiceClient();
  // const textContent = 'This is a short sentence.';
  const type = 'PLAIN_TEXT';
  const document = {
    type: type,
    content: textContent,
  };
  client.analyzeSyntax({document: document})
    .then(responses => {
      const response = responses[0];
      const tokens = response.tokens;
      for (const token of tokens) {
        console.log(`Part of speech: ${token.partOfSpeech.tag}`);
        console.log(`Text: ${token.text.content}`);
      }
    })
    .catch(err => {
      console.error(err);
    });
}


// [END language_syntax_text_core]
// tslint:disable-next-line:no-any
// [END language_syntax_text]

const argv = require(`yargs`)
  .default('text_content', 'This is a short sentence.')
  .argv;

sampleAnalyzeSyntax(argv.text_content);
