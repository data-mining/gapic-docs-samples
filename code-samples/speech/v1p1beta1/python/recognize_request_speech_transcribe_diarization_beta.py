# -*- coding: utf-8 -*-
#
# Copyright 2019 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# DO NOT EDIT! This is a generated sample ("Request",  "speech_transcribe_diarization_beta")

# To install the latest published package dependency, execute the following:
#   pip install google-cloud-speech

import sys

# [START speech_transcribe_diarization_beta]

from google.cloud import speech_v1p1beta1
import io
import six


def sample_recognize(language_code, local_file_path):
    """Separate different speakers in an audio recording"""

    # [START speech_transcribe_diarization_beta_core]

    client = speech_v1p1beta1.SpeechClient()

    # language_code = 'en-US'
    # local_file_path = 'Path to local audio file, e.g. /path/audio.wav'

    if isinstance(language_code, six.binary_type):
        language_code = language_code.decode('utf-8')
    if isinstance(local_file_path, six.binary_type):
        local_file_path = local_file_path.decode('utf-8')
    enable_speaker_diarization = True
    diarization_speaker_count = 2
    config = {
        'language_code': language_code,
        'enable_speaker_diarization': enable_speaker_diarization,
        'diarization_speaker_count': diarization_speaker_count
    }
    with io.open(local_file_path, 'rb') as f:
        content = f.read()
    audio = {'content': content}

    response = client.recognize(config, audio)
    for result in response.results:
        # First recognition hypothesis.
        # These alternatives are ordered in terms of accuracy, with the top (first) alternative being the most probable.
        #
        # first_alternative is the most probable recognition result.
        first_alternative = result.alternatives[0]
        print('Most probable transcript: {}'.format(
            first_alternative.transcript))
        print('Recognized words and assigned speaker tag:')
        for word in first_alternative.words:
            print('Word: {}'.format(word.word))
            # Speaker tag is a distinct integer assigned to every speaker in the audio.
            print('Speaker tag: {}'.format(word.speaker_tag))
        # Results of all alternatives (may be more than one)
        print('Results from all alternatives (may be more than one):')
        for alternative in result.alternatives:
            print('Transcript: {}'.format(alternative.transcript))
            for alt_word in alternative.words:
                print('Word: {}'.format(alt_word.word))
                print('Speaker tag: {}'.format(alt_word.speaker_tag))

    # [END speech_transcribe_diarization_beta_core]


# [END speech_transcribe_diarization_beta]


def main():
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument('--language_code', type=str, default='en-US')
    parser.add_argument(
        '--local_file_path',
        type=str,
        default='Path to local audio file, e.g. /path/audio.wav')
    args = parser.parse_args()

    sample_recognize(args.language_code, args.local_file_path)


if __name__ == '__main__':
    main()
