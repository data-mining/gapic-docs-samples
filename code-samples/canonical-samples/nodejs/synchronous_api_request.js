/**
 * Copyright 2019, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// To install the latest published package dependency, execute the following:
//   npm install --save @google-cloud/language

'use strict';

// [START language_sentiment_text]
// Imports the Google Cloud Natural Language library
const language = require('@google-cloud/language');

/**
 *  Analyzes the sentiment of provided text.
 *
 * @param textToAnalyze {string} The text to perform sentiment analysis on.
 */
async function analyzeTextSentiment(
  textToAnalyze = 'Hello world, I have a very happy and joyful sentiment.'
) {
  // Instantiate a client
  const client = new language.LanguageServiceClient();

  // Construct request
  const document = {
    content: textToAnalyze,
    type: 'PLAIN_TEXT',
  };

  // Run request
  const [response] = await client.analyzeSentiment({document: document});
  
  // Inspect the response.
  const sentiment = response.documentSentiment;
  console.log(`Sentiment score: ${sentiment.score}`);
  console.log(`Magnitude: ${sentiment.magnitude}`);
}
// [END language_sentiment_text]

// Code below processes command-line arguments to execute this code sample.

const argv = require(`yargs`)
  .default('text_to_analyze', 'Hello world, I have a very happy and joyful sentiment.')
  .argv;

analyzeTextSentiment(argv.text_to_analyze);
