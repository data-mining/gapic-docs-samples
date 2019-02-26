// DO NOT EDIT! This is a generated sample ("Request",  "speech_transcribe_word_level_confidence_beta")
package com.google.cloud.examples.speech.v1p1beta1;

import com.google.cloud.speech.v1p1beta1.RecognitionAudio;
import com.google.cloud.speech.v1p1beta1.RecognitionConfig;
import com.google.cloud.speech.v1p1beta1.RecognizeRequest;
import com.google.cloud.speech.v1p1beta1.RecognizeResponse;
import com.google.cloud.speech.v1p1beta1.SpeechClient;
import com.google.cloud.speech.v1p1beta1.SpeechRecognitionAlternative;
import com.google.cloud.speech.v1p1beta1.SpeechRecognitionResult;
import com.google.cloud.speech.v1p1beta1.WordInfo;
import com.google.protobuf.ByteString;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.DefaultParser;
import org.apache.commons.cli.Option;
import org.apache.commons.cli.Options;

// [START speech_transcribe_word_level_confidence_beta]
/*
 * Please include the following imports to run this sample.
 *
 * import com.google.cloud.speech.v1p1beta1.RecognitionAudio;
 * import com.google.cloud.speech.v1p1beta1.RecognitionConfig;
 * import com.google.cloud.speech.v1p1beta1.RecognitionConfig;
 * import com.google.cloud.speech.v1p1beta1.RecognizeRequest;
 * import com.google.cloud.speech.v1p1beta1.RecognizeResponse;
 * import com.google.cloud.speech.v1p1beta1.SpeechClient;
 * import com.google.cloud.speech.v1p1beta1.SpeechRecognitionAlternative;
 * import com.google.cloud.speech.v1p1beta1.SpeechRecognitionResult;
 * import com.google.cloud.speech.v1p1beta1.WordInfo;
 * import com.google.protobuf.ByteString;
 * import java.nio.file.File;
 * import java.nio.file.Files;
 * import java.nio.file.Path;
 * import java.nio.file.Paths;
 */
public class RecognizeRequestSpeechTranscribeWordLevelConfidenceBeta {
  public static void sampleRecognize(String languageCode, String localFilePath) {
    // [START speech_transcribe_word_level_confidence_beta_core]
    try (SpeechClient speechClient = SpeechClient.create()) {
      // String languageCode = "en-US";
      // String localFilePath = "Path to local audio file, e.g. /path/audio.raw";
      int sampleRateHertz = 16000;
      RecognitionConfig.AudioEncoding encoding = RecognitionConfig.AudioEncoding.LINEAR16;
      boolean enableWordConfidence = true;
      RecognitionConfig config =
          RecognitionConfig.newBuilder()
              .setSampleRateHertz(sampleRateHertz)
              .setLanguageCode(languageCode)
              .setEncoding(encoding)
              .setEnableWordConfidence(enableWordConfidence)
              .build();
      Path path = Paths.get(localFilePath);
      byte[] data = Files.readAllBytes(path);
      ByteString content = ByteString.copyFrom(data);
      RecognitionAudio audio = RecognitionAudio.newBuilder().setContent(content).build();
      RecognizeRequest request =
          RecognizeRequest.newBuilder().setConfig(config).setAudio(audio).build();
      RecognizeResponse response = speechClient.recognize(request);
      for (SpeechRecognitionResult result : response.getResultsList()) {
        SpeechRecognitionAlternative alternative = result.getAlternativesList().get(0);
        System.out.printf("Transcript: %s\n", alternative.getTranscript());
        System.out.printf("Confidence: %s\n", alternative.getConfidence());
        for (WordInfo word : alternative.getWordsList()) {
          System.out.printf("Word: %s\n", word.getWord());
          System.out.printf("Word confidence: %s\n", word.getConfidence());
        }
      }
    } catch (Exception exception) {
      System.err.println("Failed to create the client due to: " + exception);
    }
    // [END speech_transcribe_word_level_confidence_beta_core]
  }

  public static void main(String[] args) throws Exception {
    Options options = new Options();
    options.addOption(
        Option.builder("").required(false).hasArg(true).longOpt("language_code").build());
    options.addOption(
        Option.builder("").required(false).hasArg(true).longOpt("local_file_path").build());

    CommandLine cl = (new DefaultParser()).parse(options, args);
    String languageCode = cl.getOptionValue("language_code", "en-US");
    String localFilePath =
        cl.getOptionValue("local_file_path", "Path to local audio file, e.g. /path/audio.raw");

    sampleRecognize(languageCode, localFilePath);
  }
}
// FIXME: Insert here clean-up code.

// [END speech_transcribe_word_level_confidence_beta]
