// DO NOT EDIT! This is a generated sample ("Request",  "job_search_autocomplete_job_title")
'use strict';

// [START job_search_autocomplete_job_title]
// [START job_search_autocomplete_job_title_core]


const talent = require('@google-cloud/talent').v4beta1;

function sampleCompleteQuery(projectId, query, numResults, languageCode) {
  const client = new talent.CompletionClient();
  // const projectId = 'Your Google Cloud Project ID';
  // const query = '[partially typed job title]';
  // const numResults = 5;
  // const languageCode = 'en-US';
  const formattedName = client.projectPath(projectId);
  const languageCodes = [languageCode];
  const request = {
    name: formattedName,
    query: query,
    pageSize: numResults,
    languageCodes: languageCodes,
  };
  client.completeQuery(request)
    .then(responses => {
      const response = responses[0];
      for (const result of response.completionResults) {
        console.log(`Suggested title: ${result.suggestion}`);
        // Suggestion type is JOB_TITLE or COMPANY_TITLE
        console.log(`Suggestion type: ${result.type}`);
      }
    })
    .catch(err => {
      console.error(err);
    });
}


// [END job_search_autocomplete_job_title_core]
// [END job_search_autocomplete_job_title]
// tslint:disable-next-line:no-any

const argv = require(`yargs`)
  .default('project_id', 'Your Google Cloud Project ID')
  .default('query', '[partially typed job title]')
  .default('num_results', 5)
  .default('language_code', 'en-US')
  .argv;

sampleCompleteQuery(argv.project_id, argv.query, argv.num_results, argv.language_code);
