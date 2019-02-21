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
 * DO NOT EDIT! This is a generated sample ("Request",  "speech_transcribe_enhanced_model_beta")
 */

// [START speech_transcribe_enhanced_model_beta]
require __DIR__ . '/vendor/autoload.php';

use Google\Cloud\Speech\V1p1beta1\SpeechClient;
use Google\Cloud\Speech\V1p1beta1\RecognitionAudio;
use Google\Cloud\Speech\V1p1beta1\RecognitionConfig;

function sampleRecognize($localFilePath, $languageCode)
{
    // [START speech_transcribe_enhanced_model_beta_core]

    $speechClient = new SpeechClient();

    // $localFilePath = 'Path to local audio file, e.g. /path/audio.wav';
    // $languageCode = 'en-US';
    $useEnhanced = true;
    $model = 'phone_call';
    $config = new RecognitionConfig();
    $config->setLanguageCode($languageCode);
    $config->setUseEnhanced($useEnhanced);
    $config->setModel($model);
    $content = file_get_contents($localFilePath);
    $audio = new RecognitionAudio();
    $audio->setContent($content);

    try {
        $response = $speechClient->recognize($config, $audio);
        foreach ($response->getResults() as $result) {
            printf('Transcript: %s'.PHP_EOL, $result->getAlternatives()[0]->getTranscript());
        }
    } finally {
        $speechClient->close();
    }

    // [END speech_transcribe_enhanced_model_beta_core]
}
// [END speech_transcribe_enhanced_model_beta]

$opts = [
    'local_file_path::',
    'language_code::',
];

$defaultOptions = [
    'local_file_path' => 'Path to local audio file, e.g. /path/audio.wav',
    'language_code' => 'en-US',
];

$options = getopt('', $opts);
$options += $defaultOptions;

$localFilePath = $options['local_file_path'];
$languageCode = $options['language_code'];

sampleRecognize($localFilePath, $languageCode);
