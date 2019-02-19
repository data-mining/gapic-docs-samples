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

# DO NOT EDIT! This is a generated sample ("Request",  "speech_transcribe_auto_punctuation_beta")

# To install the latest published package dependency, execute the following:
#   pip install google-cloud-speech

import sys

# [START speech_transcribe_auto_punctuation_beta]

from google.cloud import speech_v1p1beta1
import io
import six


def sample_recognize(local_file_path, language_code):
    """Getting punctuation in recognize response.
"""

    # [START speech_transcribe_auto_punctuation_beta_core]

    client = speech_v1p1beta1.SpeechClient()

    # local_file_path = 'Path to local audio file, e.g. /path/audio.wav'
    # language_code = 'en-US'

    if isinstance(local_file_path, six.binary_type):
        local_file_path = local_file_path.decode('utf-8')
    if isinstance(language_code, six.binary_type):
        language_code = language_code.decode('utf-8')
    enable_automatic_punctuation = True
    config = {
        'language_code': language_code,
        'enable_automatic_punctuation': enable_automatic_punctuation
    }
    with io.open(local_file_path, 'rb') as f:
        content = f.read()
    audio = {'content': content}

    response = client.recognize(config, audio)
    for result in response.results:
        print('Transcript: {}'.format(result.alternatives[0].transcript))

    # [END speech_transcribe_auto_punctuation_beta_core]


# [END speech_transcribe_auto_punctuation_beta]


def main():
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument(
        '--local_file_path',
        type=str,
        default='Path to local audio file, e.g. /path/audio.wav')
    parser.add_argument('--language_code', type=str, default='en-US')
    args = parser.parse_args()

    sample_recognize(args.local_file_path, args.language_code)


if __name__ == '__main__':
    main()
