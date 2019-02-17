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
 * DO NOT EDIT! This is a generated sample ("Request",  "language_syntax_text")
 */

// [START language_syntax_text]
require __DIR__ . '/vendor/autoload.php';

use Google\Cloud\Language\V1\LanguageServiceClient;
use Google\Cloud\Language\V1\Document;
use Google\Cloud\Language\V1\Document_Type;

function sampleAnalyzeSyntax($textContent)
{
    // [START language_syntax_text_core]

    $languageServiceClient = new LanguageServiceClient();

    // $textContent = 'This is a short sentence.';
    $type = Document_Type::PLAIN_TEXT;
    $document = new Document();
    $document->setType($type);
    $document->setContent($textContent);

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

    // [END language_syntax_text_core]
}
// [END language_syntax_text]

$opts = [
    'text_content::',
];

$defaultOptions = [
    'text_content' => 'This is a short sentence.',
];

$options = getopt('', $opts);
$options += $defaultOptions;

$textContent = $options['text_content'];

sampleAnalyzeSyntax($textContent);
