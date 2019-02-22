// DO NOT EDIT! This is a generated sample ("Request",  "language_classify_gcs")
package com.google.cloud.examples.language.v1;

import com.google.cloud.language.v1.ClassificationCategory;
import com.google.cloud.language.v1.ClassifyTextRequest;
import com.google.cloud.language.v1.ClassifyTextResponse;
import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.LanguageServiceClient;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.DefaultParser;
import org.apache.commons.cli.Option;
import org.apache.commons.cli.Options;

// [START language_classify_gcs]
/*
 * Please include the following imports to run this sample.
 *
 * import com.google.cloud.language.v1.ClassificationCategory;
 * import com.google.cloud.language.v1.ClassifyTextRequest;
 * import com.google.cloud.language.v1.ClassifyTextResponse;
 * import com.google.cloud.language.v1.Document;
 * import com.google.cloud.language.v1.Document;
 * import com.google.cloud.language.v1.LanguageServiceClient;
 */
public class ClassifyTextRequestLanguageClassifyGcs {
  public static void sampleClassifyText(String gcsUri) {
    // [START language_classify_gcs_core]
    try (LanguageServiceClient languageServiceClient = LanguageServiceClient.create()) {
      // String gcsUri = "gs://cloud-samples-data/language/classify-entertainment.txt";
      Document.Type type = Document.Type.PLAIN_TEXT;
      Document document = Document.newBuilder().setType(type).setGcsContentUri(gcsUri).build();
      ClassifyTextRequest request = ClassifyTextRequest.newBuilder().setDocument(document).build();
      ClassifyTextResponse response = languageServiceClient.classifyText(request);
      for (ClassificationCategory category : response.getCategoriesList()) {
        System.out.printf("Category name: %s\n", category.getName());
        System.out.printf("Confidence: %s\n", category.getConfidence());
      }
    } catch (Exception exception) {
      System.err.println("Failed to create the client due to: " + exception);
    }
    // [END language_classify_gcs_core]
  }

  public static void main(String[] args) throws Exception {
    Options options = new Options();
    options.addOption(Option.builder("").required(false).hasArg(true).longOpt("gcs_uri").build());

    CommandLine cl = (new DefaultParser()).parse(options, args);
    String gcsUri =
        cl.getOptionValue("gcs_uri", "gs://cloud-samples-data/language/classify-entertainment.txt");

    sampleClassifyText(gcsUri);
  }
}
// FIXME: Insert here clean-up code.

// [END language_classify_gcs]
