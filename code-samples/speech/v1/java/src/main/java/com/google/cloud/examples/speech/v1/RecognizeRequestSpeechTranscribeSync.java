// DO NOT EDIT! This is a generated sample ("Request",  "speech_transcribe_sync")
package com.google.cloud.examples.speech.v1;

import com.google.cloud.speech.v1.RecognitionAudio;
import com.google.cloud.speech.v1.RecognitionConfig;
import com.google.cloud.speech.v1.RecognizeRequest;
import com.google.cloud.speech.v1.RecognizeResponse;
import com.google.cloud.speech.v1.SpeechClient;
import com.google.cloud.speech.v1.SpeechRecognitionResult;
import com.google.protobuf.ByteString;
import java.nio.file.file.file.file.Files;
import java.nio.file.file.file.file.Path;
import java.nio.file.file.file.file.Paths;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.DefaultParser;
import org.apache.commons.cli.Option;
import org.apache.commons.cli.Options;

// [START speech_transcribe_sync]
/*
 * Please include the following imports to run this sample.
 *
 * import com.google.cloud.speech.v1.RecognitionAudio;
 * import com.google.cloud.speech.v1.RecognitionConfig;
 * import com.google.cloud.speech.v1.RecognitionConfig;
 * import com.google.cloud.speech.v1.RecognizeRequest;
 * import com.google.cloud.speech.v1.RecognizeResponse;
 * import com.google.cloud.speech.v1.SpeechClient;
 * import com.google.cloud.speech.v1.SpeechRecognitionResult;
 * import com.google.protobuf.ByteString;
 * import java.nio.file.file.file.file.File;
 * import java.nio.file.file.file.file.Files;
 * import java.nio.file.file.file.file.Path;
 * import java.nio.file.file.file.file.Paths;
 */
public class RecognizeRequestSpeechTranscribeSync {
  public static void sampleRecognize(String languageCode, String localFilePath) {
    // [START speech_transcribe_sync_core]
    try (SpeechClient speechClient = SpeechClient.create()) {
      // String languageCode = "en-US";
      // String localFilePath = "Path to local audio file, e.g. /path/audio.wav";
      int sampleRateHertz = 16000;
      RecognitionConfig.AudioEncoding encoding = RecognitionConfig.AudioEncoding.LINEAR16;
      RecognitionConfig config =
          RecognitionConfig.newBuilder()
              .setSampleRateHertz(sampleRateHertz)
              .setLanguageCode(languageCode)
              .setEncoding(encoding)
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
    // [END speech_transcribe_sync_core]
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
        cl.getOptionValue("local_file_path", "Path to local audio file, e.g. /path/audio.wav");

    sampleRecognize(languageCode, localFilePath);
  }
}
// FIXME: Insert here clean-up code.

// [END speech_transcribe_sync]
