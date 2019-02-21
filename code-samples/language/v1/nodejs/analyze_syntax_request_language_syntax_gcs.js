// DO NOT EDIT! This is a generated sample ("Request",  "language_syntax_gcs")
'use strict';

HELLO I CHANGED A THING!

// [START language_syntax_gcs]
// [START language_syntax_gcs_core]


const language = require('@google-cloud/language').v1;

function sampleAnalyzeSyntax(gcsUri) {
  const client = new language.LanguageServiceClient();
  // const gcsUri = 'gs://cloud-samples-data/language/syntax-sentence.txt';
  const type = 'PLAIN_TEXT';
  const document = {
    type: type,
    gcsContentUri: gcsUri,
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


// [END language_syntax_gcs_core]
// tslint:disable-next-line:no-any
// [END language_syntax_gcs]

const argv = require(`yargs`)
  .default('gcs_uri', 'gs://cloud-samples-data/language/syntax-sentence.txt')
  .argv;

sampleAnalyzeSyntax(argv.gcs_uri);
