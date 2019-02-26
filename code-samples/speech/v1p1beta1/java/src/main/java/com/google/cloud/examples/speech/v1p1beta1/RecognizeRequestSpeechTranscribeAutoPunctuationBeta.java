// DO NOT EDIT! This is a generated sample ("Request",  "speech_transcribe_auto_punctuation_beta")
package com.google.cloud.examples.speech.v1p1beta1;

import com.google.cloud.speech.v1p1beta1.RecognitionAudio;
import com.google.cloud.speech.v1p1beta1.RecognitionConfig;
import com.google.cloud.speech.v1p1beta1.RecognizeRequest;
import com.google.cloud.speech.v1p1beta1.RecognizeResponse;
import com.google.cloud.speech.v1p1beta1.SpeechClient;
import com.google.cloud.speech.v1p1beta1.SpeechRecognitionResult;
import com.google.protobuf.ByteString;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.DefaultParser;
import org.apache.commons.cli.Option;
import org.apache.commons.cli.Options;

// [START speech_transcribe_auto_punctuation_beta]
/*
 * Please include the following imports to run this sample.
 *
 * import com.google.cloud.speech.v1p1beta1.RecognitionAudio;
 * import com.google.cloud.speech.v1p1beta1.RecognitionConfig;
 * import com.google.cloud.speech.v1p1beta1.RecognizeRequest;
 * import com.google.cloud.speech.v1p1beta1.RecognizeResponse;
 * import com.google.cloud.speech.v1p1beta1.SpeechClient;
 * import com.google.cloud.speech.v1p1beta1.SpeechRecognitionResult;
 * import com.google.protobuf.ByteString;
 * import java.nio.file.File;
 * import java.nio.file.Files;
 * import java.nio.file.Path;
 * import java.nio.file.Paths;
 */
public class RecognizeRequestSpeechTranscribeAutoPunctuationBeta {
  public static void sampleRecognize(String localFilePath, String languageCode) {
    // [START speech_transcribe_auto_punctuation_beta_core]
    try (SpeechClient speechClient = SpeechClient.create()) {
      // String localFilePath = "Path to local audio file, e.g. /path/audio.wav";
      // String languageCode = "en-US";
      boolean enableAutomaticPunctuation = true;
      RecognitionConfig config =
          RecognitionConfig.newBuilder()
              .setLanguageCode(languageCode)
              .setEnableAutomaticPunctuation(enableAutomaticPunctuation)
              .build();
      Path path = Paths.get(localFilePath);
      byte[] data = Files.readAllBytes(path);
      ByteString content = ByteString.copyFrom(data);
      RecognitionAudio audio = RecognitionAudio.newBuilder().setContent(content).build();
      RecognizeRequest request =
          RecognizeRequest.newBuilder().setConfig(config).setAudio(audio).build();
      RecognizeResponse response = speechClient.recognize(request);
      for (SpeechRecognitionResult result : response.getResultsList()) {
        System.out.printf("Transcript: %s\n", result.getAlternativesList().get(0).getTranscript());
      }
    } catch (Exception exception) {
      System.err.println("Failed to create the client due to: " + exception);
    }
    // [END speech_transcribe_auto_punctuation_beta_core]
  }

  public static void main(String[] args) throws Exception {
    Options options = new Options();
    options.addOption(
        Option.builder("").required(false).hasArg(true).longOpt("local_file_path").build());
    options.addOption(
        Option.builder("").required(false).hasArg(true).longOpt("language_code").build());

    CommandLine cl = (new DefaultParser()).parse(options, args);
    String localFilePath =
        cl.getOptionValue("local_file_path", "Path to local audio file, e.g. /path/audio.wav");
    String languageCode = cl.getOptionValue("language_code", "en-US");

    sampleRecognize(localFilePath, languageCode);
  }
}
// FIXME: Insert here clean-up code.

// [END speech_transcribe_auto_punctuation_beta]
