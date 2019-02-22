// DO NOT EDIT! This is a generated sample ("Request",  "language_entity_sentiment_gcs")
package com.google.cloud.examples.language.v1;

import com.google.cloud.language.v1.AnalyzeEntitySentimentRequest;
import com.google.cloud.language.v1.AnalyzeEntitySentimentResponse;
import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.Entity;
import com.google.cloud.language.v1.EntityMention;
import com.google.cloud.language.v1.LanguageServiceClient;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.DefaultParser;
import org.apache.commons.cli.Option;
import org.apache.commons.cli.Options;

// [START language_entity_sentiment_gcs]
/*
 * Please include the following imports to run this sample.
 *
 * import com.google.cloud.language.v1.AnalyzeEntitySentimentRequest;
 * import com.google.cloud.language.v1.AnalyzeEntitySentimentResponse;
 * import com.google.cloud.language.v1.Document;
 * import com.google.cloud.language.v1.Document;
 * import com.google.cloud.language.v1.Entity;
 * import com.google.cloud.language.v1.EntityMention;
 * import com.google.cloud.language.v1.LanguageServiceClient;
 */
public class AnalyzeEntitySentimentRequestLanguageEntitySentimentGcs {
  public static void sampleAnalyzeEntitySentiment(String gcsUri) {
    // [START language_entity_sentiment_gcs_core]
    try (LanguageServiceClient languageServiceClient = LanguageServiceClient.create()) {
      // String gcsUri = "gs://cloud-samples-data/language/entity-sentiment.txt";
      Document.Type type = Document.Type.PLAIN_TEXT;
      Document document = Document.newBuilder().setType(type).setGcsContentUri(gcsUri).build();
      AnalyzeEntitySentimentRequest request =
          AnalyzeEntitySentimentRequest.newBuilder().setDocument(document).build();
      AnalyzeEntitySentimentResponse response =
          languageServiceClient.analyzeEntitySentiment(request);
      for (Entity entity : response.getEntitiesList()) {
        System.out.printf("Entity name: %s\n", entity.getName());
        System.out.printf("Entity sentiment score: %s\n", entity.getSentiment().getScore());
        for (EntityMention mention : entity.getMentionsList()) {
          System.out.printf("Mention: %s\n", mention.getText().getContent());
          System.out.printf("Mention type: %s\n", mention.getType());
          System.out.printf("Mention sentiment score: %s\n", mention.getSentiment().getScore());
          System.out.printf(
              "Mention sentiment magnitude: %s\n", mention.getSentiment().getMagnitude());
        }
      }
    } catch (Exception exception) {
      System.err.println("Failed to create the client due to: " + exception);
    }
    // [END language_entity_sentiment_gcs_core]
  }

  public static void main(String[] args) throws Exception {
    Options options = new Options();
    options.addOption(Option.builder("").required(false).hasArg(true).longOpt("gcs_uri").build());

    CommandLine cl = (new DefaultParser()).parse(options, args);
    String gcsUri =
        cl.getOptionValue("gcs_uri", "gs://cloud-samples-data/language/entity-sentiment.txt");

    sampleAnalyzeEntitySentiment(gcsUri);
  }
}
// FIXME: Insert here clean-up code.

// [END language_entity_sentiment_gcs]
