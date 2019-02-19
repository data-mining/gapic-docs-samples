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
 * DO NOT EDIT! This is a generated sample ("Request",  "speech_transcribe_multilanguage_beta")
 */

// [START speech_transcribe_multilanguage_beta]
require __DIR__ . '/vendor/autoload.php';

use Google\Cloud\Speech\V1p1beta1\SpeechClient;
use Google\Cloud\Speech\V1p1beta1\RecognitionAudio;
use Google\Cloud\Speech\V1p1beta1\RecognitionConfig;

function sampleRecognize($localFilePath, $languageCode, $altLanguageOne, $altLanguageTwo, $altLanguageThree)
{
    // [START speech_transcribe_multilanguage_beta_core]

    $speechClient = new SpeechClient();

    // $localFilePath = 'Path to local audio file, e.g. /path/audio.wav';
    // $languageCode = 'fr-FR';
    // $altLanguageOne = 'de-DE';
    // $altLanguageTwo = 'it-IT';
    // $altLanguageThree = 'en-US';
    $alternativeLanguageCodes = [$altLanguageOne, $altLanguageTwo, $altLanguageThree];
    $config = new RecognitionConfig();
    $config->setLanguageCode($languageCode);
    $config->setAlternativeLanguageCodes($alternativeLanguageCodes);
    $content = file_get_contents($localFilePath);
    $audio = new RecognitionAudio();
    $audio->setContent($content);

    try {
        $response = $speechClient->recognize($config, $audio);
        // Each recognition result corresponds to a portion of audio
        foreach ($response->getResults() as $result) {
            printf('Result detected language: %s'.PHP_EOL, $result->getLanguageCode());
            printf('Highest accuracy result transcript: %s'.PHP_EOL, $result->getAlternatives()[0]->getTranscript());
        }
    } finally {
        $speechClient->close();
    }

    // [END speech_transcribe_multilanguage_beta_core]
}
// [END speech_transcribe_multilanguage_beta]

$opts = [
    'local_file_path::',
    'language_code::',
    'alt_language_one::',
    'alt_language_two::',
    'alt_language_three::',
];

$defaultOptions = [
    'local_file_path' => 'Path to local audio file, e.g. /path/audio.wav',
    'language_code' => 'fr-FR',
    'alt_language_one' => 'de-DE',
    'alt_language_two' => 'it-IT',
    'alt_language_three' => 'en-US',
];

$options = getopt('', $opts);
$options += $defaultOptions;

$localFilePath = $options['local_file_path'];
$languageCode = $options['language_code'];
$altLanguageOne = $options['alt_language_one'];
$altLanguageTwo = $options['alt_language_two'];
$altLanguageThree = $options['alt_language_three'];

sampleRecognize($localFilePath, $languageCode, $altLanguageOne, $altLanguageTwo, $altLanguageThree);
