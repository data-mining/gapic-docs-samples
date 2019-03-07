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
require "google/cloud/language"

# Analyzes the sentiment of provided text.
#
# @param text_to_analyze {String} The text to perform sentiment analysis on
def analyze_text_sentiment(
    text_to_analyze="Hello world, I have a very happy and joyful sentiment.")

    # Instantiate a client
    client = Google::Cloud::Language.new

    # Construct request
    document = {
        content: text_to_analyze,
        type: :PLAIN_TEXT
    }

    # Run request
    response = client.analyze_sentiment document

    # Inspect the results.
    sentiment = response.document_sentiment
    puts "Sentiment score: #{sentiment.score}"
    puts "Magnitude: #{sentiment.magnitude}"
end
# [END language_sentiment_text]

# Code below processes command-line arguments to execute this code sample.

require "optparse"

if $0 == __FILE__
    text_to_analyze = "Hello world, I have a very happy and joyful sentiment."

    ARGV.options do |opts|
        opts.on("--text_to_analyze=val", String) { |val| text_to_analyze = val }
        opts.parse!
    end

    analyze_text_sentiment(text_to_analyze)
end