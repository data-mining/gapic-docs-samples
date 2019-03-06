#!/usr/bin/env python

# Copyright 2019 Google, LLC.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# To install the latest published package dependency, execute the following:
#   pip install google-cloud-language

# [START language_sentiment_text]
# Imports the Google Cloud Natural Language library
from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types

def analyze_text_sentiment(
    text_to_analyze='Hello world, I have a very happy and joyful sentiment.'):
    """Analyzes the sentiment of provided text.
    Args:
        text_to_analyze (string): The text to perform sentiment analysis on
    """

    # Instantiate a client
    client = language.LanguageServiceClient()

    # Construct request
    document = types.Document(
        content=text_to_analyze,
        type=enums.Document.Type.PLAIN_TEXT)

    # Run request
    response = client.analyze_sentiment(document)

    # Inspect the results.
    sentiment = response.document_sentiment
    print('Sentiment score: {}'.format(sentiment.score))
    print('Magnitude: {}'.format(sentiment.magnitude))
# [END language_sentiment_text]

# Code below processes command-line arguments to execute this code sample.

def main():
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument(
        '--text_to_analyze',
        type=str,
        default='Hello world, I have a very happy and joyful sentiment.')
    args = parser.parse_args()

    analyze_text_sentiment(args.text_to_analyze)

if __name__ == '__main__':
    main()
