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
//   Install-Package Google.Cloud.Language.V1

// Library to process command-line arguments to execute this code sample
using CommandLine;

// [START language_sentiment_text]
using System;

// Imports the Google Cloud Natural Language library
using Google.Cloud.Language.V1;

public class AnalyzeTextSentimentSample
{
  /// <summary>
  /// Analyzes the sentiment of provided text.
  ///</summary>
  /// <param name="textToAnalyze">The text to perform sentiment analysis on.
  /// </param>
  public void AnalyzeTextSentiment(
    string textToAnalyze = "Hello world, I have a very happy and joyful sentiment.")
  {
    // Instantiate a client
    var client = LanguageServiceClient.Create();;

    // Construct request
    var document = new Document()
    {
      Content = textToAnalyze,
      Type = Document.Types.Type.PlainText
    };

    // Run request
    var response = client.AnalyzeSentiment(document);
    
    // Inspect the response.
    var sentiment = response.DocumentSentiment;
    Console.WriteLine($"Sentiment score: {sentiment.Score}");
    Console.WriteLine($"Magnitude: {sentiment.Magnitude}");
  }
}
// [END language_sentiment_text]

// Code below processes command-line arguments to execute this code sample.

class Program
{
  public static void Main(string[] args)
  {
    Parser.Default.ParseArguments<Options>(args).WithParsed<Options>(o => {
      var sample = new AnalyzeTextSentimentSample();
      sample.AnalyzeTextSentiment(o.TextToAnalyze);
    });
  }

  class Options
  {
    [Option("text_to_analyze",
      Default = "Hello world, I have a very happy and joyful sentiment.")]
    public string TextToAnalyze { get; set; }
  }
}
