// DO NOT EDIT! This is a generated sample ("Callable",  "language_entities_gcs")
package com.google.cloud.examples.language.v1;

import com.google.api.core.ApiFuture;
import com.google.cloud.language.v1.AnalyzeEntitiesRequest;
import com.google.cloud.language.v1.AnalyzeEntitiesResponse;
import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.Entity;
import com.google.cloud.language.v1.EntityMention;
import com.google.cloud.language.v1.LanguageServiceClient;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.DefaultParser;
import org.apache.commons.cli.Option;
import org.apache.commons.cli.Options;

// [START language_entities_gcs]
/*
 * Please include the following imports to run this sample.
 *
 * import com.google.api.core.ApiFuture;
 * import com.google.cloud.language.v1.AnalyzeEntitiesRequest;
 * import com.google.cloud.language.v1.AnalyzeEntitiesResponse;
 * import com.google.cloud.language.v1.Document;
 * import com.google.cloud.language.v1.Document;
 * import com.google.cloud.language.v1.Entity;
 * import com.google.cloud.language.v1.EntityMention;
 * import com.google.cloud.language.v1.LanguageServiceClient;
 */
public class AnalyzeEntitiesCallableCallableLanguageEntitiesGcs {
  public static void sampleAnalyzeEntities(String gcsUri) {
    // [START language_entities_gcs_core]
    try (LanguageServiceClient languageServiceClient = LanguageServiceClient.create()) {
      // String gcsUri = "gs://cloud-samples-data/language/entity.txt";
      Document.Type type = Document.Type.PLAIN_TEXT;
      Document document = Document.newBuilder().setType(type).setGcsContentUri(gcsUri).build();
      AnalyzeEntitiesRequest request =
          AnalyzeEntitiesRequest.newBuilder().setDocument(document).build();
      ApiFuture<AnalyzeEntitiesResponse> future =
          languageServiceClient.analyzeEntitiesCallable().futureCall(request);

      // Do something

      AnalyzeEntitiesResponse response = future.get();
      for (Entity entity : response.getEntitiesList()) {
        System.out.printf("Entity name: %s\n", entity.getName());
        System.out.printf("Entity type: %s\n", entity.getType());
        System.out.printf("Entity salience score: %s\n", entity.getSalience());
        for (EntityMention mention : entity.getMentionsList()) {
          System.out.printf("Mention: %s\n", mention.getText().getContent());
          System.out.printf("Mention type: %s\n", mention.getType());
        }
      }
    } catch (Exception exception) {
      System.err.println("Failed to create the client due to: " + exception);
    }
    // [END language_entities_gcs_core]
  }

  public static void main(String[] args) {
    Options options = new Options();
    options.addOption(Option.builder("").required(false).hasArg(true).longOpt("gcs_uri").build());

    CommandLine cl = (new DefaultParser()).parse(options, args);
    String gcsUri = cl.getOptionValue("gcs_uri", "gs://cloud-samples-data/language/entity.txt");

    sampleAnalyzeEntities(gcsUri);
  }
}
// FIXME: Insert here clean-up code.

// [END language_entities_gcs]
