// DO NOT EDIT! This is a generated sample ("Flattened",  "language_sentiment_gcs")
package com.google.cloud.examples.language.v1;

import com.google.cloud.language.v1.AnalyzeSentimentResponse;
import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.language.v1.Sentiment;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.DefaultParser;
import org.apache.commons.cli.Option;
import org.apache.commons.cli.Options;

// [START language_sentiment_gcs]
/*
 * Please include the following imports to run this sample.
 *
 * import com.google.cloud.language.v1.AnalyzeSentimentResponse;
 * import com.google.cloud.language.v1.Document;
 * import com.google.cloud.language.v1.Document;
 * import com.google.cloud.language.v1.LanguageServiceClient;
 * import com.google.cloud.language.v1.Sentiment;
 */
public class AnalyzeSentimentFlattenedLanguageSentimentGcs {
  public static void sampleAnalyzeSentiment(String gcsUri) {
    // [START language_sentiment_gcs_core]
    try (LanguageServiceClient languageServiceClient = LanguageServiceClient.create()) {
      // String gcsUri = "gs://cloud-samples-data/language/sentiment-positive.txt";
      Document.Type type = Document.Type.PLAIN_TEXT;
      Document document = Document.newBuilder().setType(type).setGcsContentUri(gcsUri).build();
      AnalyzeSentimentResponse response = languageServiceClient.analyzeSentiment(document);
      Sentiment sentiment = response.getDocumentSentiment();
      System.out.printf("Sentiment score: %s\n", sentiment.getScore());
      System.out.printf("Magnitude: %s\n", sentiment.getMagnitude());
    } catch (Exception exception) {
      System.err.println("Failed to create the client due to: " + exception);
    }
    // [END language_sentiment_gcs_core]
  }

  public static void main(String[] args) throws Exception {
    Options options = new Options();
    options.addOption(Option.builder("").required(false).hasArg(true).longOpt("gcs_uri").build());

    CommandLine cl = (new DefaultParser()).parse(options, args);
    String gcsUri =
        cl.getOptionValue("gcs_uri", "gs://cloud-samples-data/language/sentiment-positive.txt");

    sampleAnalyzeSentiment(gcsUri);
  }
}
// FIXME: Insert here clean-up code.

// [END language_sentiment_gcs]
