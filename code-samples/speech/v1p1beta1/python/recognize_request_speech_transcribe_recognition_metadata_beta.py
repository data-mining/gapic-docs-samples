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

# DO NOT EDIT! This is a generated sample ("Request",  "speech_transcribe_recognition_metadata_beta")

# To install the latest published package dependency, execute the following:
#   pip install google-cloud-speech

import sys

# [START speech_transcribe_recognition_metadata_beta]

from google.cloud import speech_v1p1beta1
from google.cloud.speech_v1p1beta1 import enums
import io
import six


def sample_recognize(local_file_path, language_code):
    """Adding recognition metadata to recognize request
"""

    # [START speech_transcribe_recognition_metadata_beta_core]

    client = speech_v1p1beta1.SpeechClient()

    # local_file_path = 'Path to local audio file, e.g. /path/audio.wav'
    # language_code = 'en-US'

    if isinstance(local_file_path, six.binary_type):
        local_file_path = local_file_path.decode('utf-8')
    if isinstance(language_code, six.binary_type):
        language_code = language_code.decode('utf-8')
    interaction_type = enums.RecognitionMetadata.InteractionType.DISCUSSION
    microphone_distance = enums.RecognitionMetadata.MicrophoneDistance.NEARFIELD
    recording_device_type = enums.RecognitionMetadata.RecordingDeviceType.SMARTPHONE
    recording_device_name = 'Pixel 2 XL'
    industry_naics_code_of_audio = 519190
    metadata = {
        'interaction_type': interaction_type,
        'microphone_distance': microphone_distance,
        'recording_device_type': recording_device_type,
        'recording_device_name': recording_device_name,
        'industry_naics_code_of_audio': industry_naics_code_of_audio
    }
    config = {'language_code': language_code, 'metadata': metadata}
    with io.open(local_file_path, 'rb') as f:
        content = f.read()
    audio = {'content': content}

    response = client.recognize(config, audio)
    for result in response.results:
        print('Transcript: {}'.format(result.alternatives[0].transcript))

    # [END speech_transcribe_recognition_metadata_beta_core]


# [END speech_transcribe_recognition_metadata_beta]


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
