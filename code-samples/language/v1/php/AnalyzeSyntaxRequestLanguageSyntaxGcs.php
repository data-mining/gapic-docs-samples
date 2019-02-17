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
 * DO NOT EDIT! This is a generated sample ("Request",  "language_syntax_gcs")
 */

// [START language_syntax_gcs]
require __DIR__ . '/vendor/autoload.php';

use Google\Cloud\Language\V1\LanguageServiceClient;
use Google\Cloud\Language\V1\Document;
use Google\Cloud\Language\V1\Document_Type;

function sampleAnalyzeSyntax($gcsUri)
{
    // [START language_syntax_gcs_core]

    $languageServiceClient = new LanguageServiceClient();

    // $gcsUri = 'gs://cloud-samples-data/language/syntax-sentence.txt';
    $type = Document_Type::PLAIN_TEXT;
    $document = new Document();
    $document->setType($type);
    $document->setGcsContentUri($gcsUri);

    try {
        $response = $languageServiceClient->analyzeSyntax($document);
        $tokens = $response->getTokens();
        foreach ($tokens as $token) {
            printf('Part of speech: %s'.PHP_EOL, $token->getPartOfSpeech()->getTag());
            printf('Text: %s'.PHP_EOL, $token->getText()->getContent());
        }
    } finally {
        $languageServiceClient->close();
    }

    // [END language_syntax_gcs_core]
}
// [END language_syntax_gcs]

$opts = [
    'gcs_uri::',
];

$defaultOptions = [
    'gcs_uri' => 'gs://cloud-samples-data/language/syntax-sentence.txt',
];

$options = getopt('', $opts);
$options += $defaultOptions;

$gcsUri = $options['gcs_uri'];

sampleAnalyzeSyntax($gcsUri);
