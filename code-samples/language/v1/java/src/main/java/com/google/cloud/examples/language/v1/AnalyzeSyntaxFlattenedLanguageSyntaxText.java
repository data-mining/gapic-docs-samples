// DO NOT EDIT! This is a generated sample ("Flattened",  "language_syntax_text")
package com.google.cloud.examples.language.v1;

import com.google.cloud.language.v1.AnalyzeSyntaxResponse;
import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.EncodingType;
import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.language.v1.Token;
import java.util.List;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.DefaultParser;
import org.apache.commons.cli.Option;
import org.apache.commons.cli.Options;

// [START language_syntax_text]
/*
 * Please include the following imports to run this sample.
 *
 * import com.google.cloud.language.v1.AnalyzeSyntaxResponse;
 * import com.google.cloud.language.v1.Document;
 * import com.google.cloud.language.v1.Document;
 * import com.google.cloud.language.v1.EncodingType;
 * import com.google.cloud.language.v1.LanguageServiceClient;
 * import com.google.cloud.language.v1.Token;
 * import java.util.List;
 */
public class AnalyzeSyntaxFlattenedLanguageSyntaxText {
  public static void sampleAnalyzeSyntax(String textContent) {
    // [START language_syntax_text_core]
    try (LanguageServiceClient languageServiceClient = LanguageServiceClient.create()) {
      // String textContent = "This is a short sentence.";
      Document.Type type = Document.Type.PLAIN_TEXT;
      Document document = Document.newBuilder().setType(type).setContent(textContent).build();
      EncodingType encodingType = EncodingType.NONE;
      AnalyzeSyntaxResponse response = languageServiceClient.analyzeSyntax(document, encodingType);
      List<Token> tokens = response.getTokensList();
      for (Token token : tokens) {
        System.out.printf("Part of speech: %s\n", token.getPartOfSpeech().getTag());
        System.out.printf("Text: %s\n", token.getText().getContent());
      }
    } catch (Exception exception) {
      System.err.println("Failed to create the client due to: " + exception);
    }
    // [END language_syntax_text_core]
  }

  public static void main(String[] args) throws Exception {
    Options options = new Options();
    options.addOption(
        Option.builder("").required(false).hasArg(true).longOpt("text_content").build());

    CommandLine cl = (new DefaultParser()).parse(options, args);
    String textContent = cl.getOptionValue("text_content", "This is a short sentence.");

    sampleAnalyzeSyntax(textContent);
  }
}
// FIXME: Insert here clean-up code.

// [END language_syntax_text]
