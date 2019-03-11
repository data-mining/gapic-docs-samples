<?php
/*
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * DO NOT EDIT! This is a generated sample ("Request",  "job_search_autocomplete_job_title")
 */

// [START job_search_autocomplete_job_title]
require __DIR__ . '/vendor/autoload.php';

use Google\Cloud\Talent\V4beta1\CompletionClient;

function sampleCompleteQuery($projectId, $query, $numResults, $languageCode)
{
    // [START job_search_autocomplete_job_title_core]

    $completionClient = new CompletionClient();

    // $projectId = 'Your Google Cloud Project ID';
    // $query = '[partially typed job title]';
    // $numResults = 5;
    // $languageCode = 'en-US';
    $formattedName = $completionClient->projectName($projectId);
    $languageCodes = [$languageCode];

    try {
        $response = $completionClient->completeQuery($formattedName, $query, $numResults, ['languageCodes' => $languageCodes]);
        foreach ($response->getCompletionResults() as $result) {
            printf('Suggested title: %s'.PHP_EOL, $result->getSuggestion());
            // Suggestion type is JOB_TITLE or COMPANY_TITLE
            printf('Suggestion type: %s'.PHP_EOL, $result->getType());
        }
    } finally {
        $completionClient->close();
    }

    // [END job_search_autocomplete_job_title_core]
}
// [END job_search_autocomplete_job_title]

$opts = [
    'project_id::',
    'query::',
    'num_results::',
    'language_code::',
];

$defaultOptions = [
    'project_id' => 'Your Google Cloud Project ID',
    'query' => '[partially typed job title]',
    'num_results' => 5,
    'language_code' => 'en-US',
];

$options = getopt('', $opts);
$options += $defaultOptions;

$projectId = $options['project_id'];
$query = $options['query'];
$numResults = $options['num_results'];
$languageCode = $options['language_code'];

sampleCompleteQuery($projectId, $query, $numResults, $languageCode);
