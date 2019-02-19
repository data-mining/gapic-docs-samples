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
 * DO NOT EDIT! This is a generated sample ("Request",  "speech_transcribe_diarization_beta")
 */

// [START speech_transcribe_diarization_beta]
require __DIR__ . '/vendor/autoload.php';

use Google\Cloud\Speech\V1p1beta1\SpeechClient;
use Google\Cloud\Speech\V1p1beta1\RecognitionAudio;
use Google\Cloud\Speech\V1p1beta1\RecognitionConfig;

function sampleRecognize($languageCode, $localFilePath)
{
    // [START speech_transcribe_diarization_beta_core]

    $speechClient = new SpeechClient();

    // $languageCode = 'en-US';
    // $localFilePath = 'Path to local audio file, e.g. /path/audio.wav';
    $enableSpeakerDiarization = true;
    $diarizationSpeakerCount = 2;
    $config = new RecognitionConfig();
    $config->setLanguageCode($languageCode);
    $config->setEnableSpeakerDiarization($enableSpeakerDiarization);
    $config->setDiarizationSpeakerCount($diarizationSpeakerCount);
    $content = file_get_contents($localFilePath);
    $audio = new RecognitionAudio();
    $audio->setContent($content);

    try {
        $response = $speechClient->recognize($config, $audio);
        foreach ($response->getResults() as $result) {
            // First recognition hypothesis.
            // These alternatives are ordered in terms of accuracy, with the top (first) alternative being the most probable.
            //
            // firstAlternative is the most probable recognition result.
            $firstAlternative = $result->getAlternatives()[0];
            printf('Most probable transcript: %s'.PHP_EOL, $firstAlternative->getTranscript());
            printf('Recognized words and assigned speaker tag:'.PHP_EOL);
            foreach ($firstAlternative->getWords() as $word) {
                printf('Word: %s'.PHP_EOL, $word->getWord());
                // Speaker tag is a distinct integer assigned to every speaker in the audio.
                printf('Speaker tag: %s'.PHP_EOL, $word->getSpeakerTag());
            }
        }
    } finally {
        $speechClient->close();
    }

    // [END speech_transcribe_diarization_beta_core]
}
// [END speech_transcribe_diarization_beta]

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
