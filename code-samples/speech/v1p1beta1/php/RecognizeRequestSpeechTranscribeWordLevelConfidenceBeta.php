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
 * DO NOT EDIT! This is a generated sample ("Request",  "speech_transcribe_word_level_confidence_beta")
 */

// [START speech_transcribe_word_level_confidence_beta]
require __DIR__ . '/vendor/autoload.php';

use Google\Cloud\Speech\V1p1beta1\SpeechClient;
use Google\Cloud\Speech\V1p1beta1\RecognitionAudio;
use Google\Cloud\Speech\V1p1beta1\RecognitionConfig;
use Google\Cloud\Speech\V1p1beta1\RecognitionConfig_AudioEncoding;

function sampleRecognize($languageCode, $localFilePath)
{
    // [START speech_transcribe_word_level_confidence_beta_core]

    $speechClient = new SpeechClient();

    // $languageCode = 'en-US';
    // $localFilePath = 'Path to local audio file, e.g. /path/audio.wav';
    $sampleRateHertz = 16000;
    $encoding = RecognitionConfig_AudioEncoding::LINEAR16;
    $enableWordConfidence = true;
    $config = new RecognitionConfig();
    $config->setSampleRateHertz($sampleRateHertz);
    $config->setLanguageCode($languageCode);
    $config->setEncoding($encoding);
    $config->setEnableWordConfidence($enableWordConfidence);
    $content = file_get_contents($localFilePath);
    $audio = new RecognitionAudio();
    $audio->setContent($content);

    try {
        $response = $speechClient->recognize($config, $audio);
        foreach ($response->getResults() as $result) {
            $alternative = $result->getAlternatives()[0];
            printf('Transcript: %s'.PHP_EOL, $alternative->getTranscript());
            printf('Confidence: %s'.PHP_EOL, $alternative->getConfidence());
            foreach ($alternative->getWords() as $word) {
                printf('Word: %s'.PHP_EOL, $word->getWord());
                printf('Word confidence: %s'.PHP_EOL, $word->getConfidence());
            }
        }
    } finally {
        $speechClient->close();
    }

    // [END speech_transcribe_word_level_confidence_beta_core]
}
// [END speech_transcribe_word_level_confidence_beta]

$opts = [
    'language_code::',
    'local_file_path::',
];

$defaultOptions = [
    'language_code' => 'en-US',
    'local_file_path' => 'Path to local audio file, e.g. /path/audio.wav',
];

$options = getopt('', $opts);
$options += $defaultOptions;

$languageCode = $options['language_code'];
$localFilePath = $options['local_file_path'];

sampleRecognize($languageCode, $localFilePath);
