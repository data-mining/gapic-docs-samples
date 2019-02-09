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
 * DO NOT EDIT! This is a generated sample ("Request",  "language_analyze_sentiment_v1beta2")
 */

// [START language_analyze_sentiment_v1beta2]
require __DIR__ . '/vendor/autoload.php';

use Google\Cloud\Language\V1beta2\LanguageServiceClient;
use Google\Cloud\Language\V1beta2\Document;
use Google\Cloud\Language\V1beta2\Document_Type;

function sampleAnalyzeSentiment($textContent)
{
    // [START language_analyze_sentiment_v1beta2_core]

    $languageServiceClient = new LanguageServiceClient();

    // $textContent = 'Example text for sentiment analysis';
    $type = Document_Type::PLAIN_TEXT;
    $document = new Document();
    $document->setContent($textContent);
    $document->setType($type);

    try {
        $response = $languageServiceClient->analyzeSentiment($document);
        $sentiment = $response->getDocumentSentiment();
        printf('Overall sentiment: %s'.PHP_EOL, $sentiment->getScore());
        printf('Sentiment for each sentence:'.PHP_EOL);
        foreach ($response->getSentences() as $sentence) {
            printf('Sentence: %s'.PHP_EOL, $sentence->getText()->getContent());
            printf('=> %s'.PHP_EOL, $sentence->getSentiment()->getScore());
        }
    } finally {
        $languageServiceClient->close();
    }

    // [END language_analyze_sentiment_v1beta2_core]
}
// [END language_analyze_sentiment_v1beta2]

$opts = [
    'textContent::',
];

$defaultOptions = [
    'textContent' => 'Example text for sentiment analysis',
];

$options = getopt('', $opts);
$options += $defaultOptions;

$textContent = $options['textContent'];

sampleAnalyzeSentiment($textContent);
