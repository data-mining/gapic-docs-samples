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
 * DO NOT EDIT! This is a generated sample ("Request",  "language_entity_sentiment_text")
 */

// [START language_entity_sentiment_text]
require __DIR__.'/../../../../vendor/autoload.php';

use Google\Cloud\Language\V1\LanguageServiceClient;
use Google\Cloud\Language\V1\Document;
use Google\Cloud\Language\V1\Document_Type;

function sampleAnalyzeEntitySentiment($content)
{
    // [START language_entity_sentiment_text_core]

    $languageServiceClient = new LanguageServiceClient();

    // $content = 'California is a state.';
    $type = Document_Type::PLAIN_TEXT;
    $document = new Document();
    $document->setType($type);
    $document->setContent($content);

    try {
        $response = $languageServiceClient->analyzeEntitySentiment($document);
        foreach ($response->getEntities() as $entity) {
            printf('Entity name: %s'.PHP_EOL, $entity->getName());
            printf('Entity sentiment: %s'.PHP_EOL, $entity->getSentiment()->getScore());
            foreach ($entity->getMentions() as $mention) {
                printf('Content: %s'.PHP_EOL, $mention->getText()->getContent());
                printf('Sentiment score: %s'.PHP_EOL, $mention->getSentiment()->getScore());
                printf('Sentiment magnitude: %s'.PHP_EOL, $mention->getSentiment()->getMagnitude());
                printf('Mention type: %s'.PHP_EOL, $mention->getType());
            }
        }
    } finally {
        $languageServiceClient->close();
    }

    // [END language_entity_sentiment_text_core]
}
// [END language_entity_sentiment_text]

$opts = [
    'content::',
];

$defaultOptions = [
    'content' => 'California is a state.',
];

$options = getopt('', $opts);
$options += $defaultOptions;

$content = $options['content'];

sampleAnalyzeEntitySentiment($content);
