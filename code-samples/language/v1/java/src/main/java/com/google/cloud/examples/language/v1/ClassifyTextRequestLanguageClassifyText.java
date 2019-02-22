// DO NOT EDIT! This is a generated sample ("Request",  "language_classify_text")
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

// [START language_classify_text]
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
public class ClassifyTextRequestLanguageClassifyText {
  public static void sampleClassifyText(String textContent) {
    // [START language_classify_text_core]
    try (LanguageServiceClient languageServiceClient = LanguageServiceClient.create()) {
      // String textContent = "This is about film and movies and television and acting and movie theatres and theatre and drama and entertainment and the arts.";
      Document.Type type = Document.Type.PLAIN_TEXT;
      Document document = Document.newBuilder().setType(type).setContent(textContent).build();
      ClassifyTextRequest request = ClassifyTextRequest.newBuilder().setDocument(document).build();
      ClassifyTextResponse response = languageServiceClient.classifyText(request);
      for (ClassificationCategory category : response.getCategoriesList()) {
        System.out.printf("Category name: %s\n", category.getName());
        System.out.printf("Confidence: %s\n", category.getConfidence());
      }
    } catch (Exception exception) {
      System.err.println("Failed to create the client due to: " + exception);
    }
    // [END language_classify_text_core]
  }

  public static void main(String[] args) {
    Options options = new Options();
    options.addOption(
        Option.builder("").required(false).hasArg(true).longOpt("text_content").build());

    CommandLine cl = (new DefaultParser()).parse(options, args);
    String textContent =
        cl.getOptionValue(
            "text_content",
            "This is about film and movies and television and acting and movie theatres and theatre and drama and entertainment and the arts.");

    sampleClassifyText(textContent);
  }
}
// FIXME: Insert here clean-up code.

// [END language_classify_text]
