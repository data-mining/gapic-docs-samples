// DO NOT EDIT! This is a generated sample ("Request",  "language_sentiment_text")
package com.google.cloud.examples.language.v1;

import com.google.cloud.language.v1.AnalyzeSentimentRequest;
import com.google.cloud.language.v1.AnalyzeSentimentResponse;
import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.language.v1.Sentiment;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.DefaultParser;
import org.apache.commons.cli.Option;
import org.apache.commons.cli.Options;

// [START language_sentiment_text]
/*
 * Please include the following imports to run this sample.
 *
 * import com.google.cloud.language.v1.AnalyzeSentimentRequest;
 * import com.google.cloud.language.v1.AnalyzeSentimentResponse;
 * import com.google.cloud.language.v1.Document;
 * import com.google.cloud.language.v1.Document;
 * import com.google.cloud.language.v1.LanguageServiceClient;
 * import com.google.cloud.language.v1.Sentiment;
 */
public class AnalyzeSentimentRequestLanguageSentimentText {
  public static void sampleAnalyzeSentiment(String textContent) {
    // [START language_sentiment_text_core]
    try (LanguageServiceClient languageServiceClient = LanguageServiceClient.create()) {
      // String textContent = "I am so happy and joyful.";
      Document.Type type = Document.Type.PLAIN_TEXT;
      Document document = Document.newBuilder().setType(type).setContent(textContent).build();
      AnalyzeSentimentRequest request =
          AnalyzeSentimentRequest.newBuilder().setDocument(document).build();
      AnalyzeSentimentResponse response = languageServiceClient.analyzeSentiment(request);
      Sentiment sentiment = response.getDocumentSentiment();
      System.out.printf("Sentiment score: %s\n", sentiment.getScore());
      System.out.printf("Magnitude: %s\n", sentiment.getMagnitude());
    } catch (Exception exception) {
      System.err.println("Failed to create the client due to: " + exception);
    }
    // [END language_sentiment_text_core]
  }

  public static void main(String[] args) throws Exception {
    Options options = new Options();
    options.addOption(
        Option.builder("").required(false).hasArg(true).longOpt("text_content").build());

    CommandLine cl = (new DefaultParser()).parse(options, args);
    String textContent = cl.getOptionValue("text_content", "I am so happy and joyful.");

    sampleAnalyzeSentiment(textContent);
  }
}
// FIXME: Insert here clean-up code.

// [END language_sentiment_text]
