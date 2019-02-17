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

# DO NOT EDIT! This is a generated sample ("LongRunningPromise",  "speech_transcribe_async_gcs")

# To install the latest published package dependency, execute the following:
#   pip install google-cloud-speech

import sys

# [START speech_transcribe_async_gcs]

from google.cloud import speech_v1
from google.cloud.speech_v1 import enums
import six


def sample_long_running_recognize(language_code, gcs_uri):
    """Transcribe audio file from Google Cloud Storage asynchronously"""

    # [START speech_transcribe_async_gcs_core]

    client = speech_v1.SpeechClient()

    # language_code = 'en-US'
    # gcs_uri = 'gs://cloud-samples-data/speech/brooklyn_bridge.raw'

    if isinstance(language_code, six.binary_type):
        language_code = language_code.decode('utf-8')
    if isinstance(gcs_uri, six.binary_type):
        gcs_uri = gcs_uri.decode('utf-8')
    sample_rate_hertz = 16000
    encoding = enums.RecognitionConfig.AudioEncoding.LINEAR16
    config = {
        'sample_rate_hertz': sample_rate_hertz,
        'language_code': language_code,
        'encoding': encoding
    }
    audio = {'uri': gcs_uri}

    operation = client.long_running_recognize(config, audio)

    print('Waiting for operation to complete...')
    response = operation.result()

    for result in response.results:
        print('Transcript: {}'.format(result.alternatives[0].transcript))

    # [END speech_transcribe_async_gcs_core]


# [END speech_transcribe_async_gcs]


def main():
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument('--language_code', type=str, default='en-US')
    parser.add_argument(
        '--gcs_uri',
        type=str,
        default='gs://cloud-samples-data/speech/brooklyn_bridge.raw')
    args = parser.parse_args()

    sample_long_running_recognize(args.language_code, args.gcs_uri)


if __name__ == '__main__':
    main()
