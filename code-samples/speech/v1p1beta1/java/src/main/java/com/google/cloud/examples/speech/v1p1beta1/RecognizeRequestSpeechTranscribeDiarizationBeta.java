// DO NOT EDIT! This is a generated sample ("Request",  "speech_transcribe_diarization_beta")
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

// [START speech_transcribe_diarization_beta]
/*
 * Please include the following imports to run this sample.
 *
 * import com.google.cloud.speech.v1p1beta1.RecognitionAudio;
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
public class RecognizeRequestSpeechTranscribeDiarizationBeta {
  public static void sampleRecognize(String languageCode, String localFilePath) {
    // [START speech_transcribe_diarization_beta_core]
    try (SpeechClient speechClient = SpeechClient.create()) {
      // String languageCode = "en-US";
      // String localFilePath = "Path to local audio file, e.g. /path/audio.wav";
      boolean enableSpeakerDiarization = true;
      int diarizationSpeakerCount = 2;
      RecognitionConfig config =
          RecognitionConfig.newBuilder()
              .setLanguageCode(languageCode)
              .setEnableSpeakerDiarization(enableSpeakerDiarization)
              .setDiarizationSpeakerCount(diarizationSpeakerCount)
              .build();
      Path path = Paths.get(localFilePath);
      byte[] data = Files.readAllBytes(path);
      ByteString content = ByteString.copyFrom(data);
      RecognitionAudio audio = RecognitionAudio.newBuilder().setContent(content).build();
      RecognizeRequest request =
          RecognizeRequest.newBuilder().setConfig(config).setAudio(audio).build();
      RecognizeResponse response = speechClient.recognize(request);
      for (SpeechRecognitionResult result : response.getResultsList()) {
        // First recognition hypothesis.
        // These alternatives are ordered in terms of accuracy, with the top (first) alternative being the most probable.
        //
        // firstAlternative is the most probable recognition result.
        SpeechRecognitionAlternative firstAlternative = result.getAlternativesList().get(0);
        System.out.printf("Most probable transcript: %s\n", firstAlternative.getTranscript());
        System.out.println("Recognized words and assigned speaker tag:");
        for (WordInfo word : firstAlternative.getWordsList()) {
          System.out.printf("Word: %s\n", word.getWord());
          // Speaker tag is a distinct integer assigned to every speaker in the audio.
          System.out.printf("Speaker tag: %s\n", word.getSpeakerTag());
        }
      }
    } catch (Exception exception) {
      System.err.println("Failed to create the client due to: " + exception);
    }
    // [END speech_transcribe_diarization_beta_core]
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

// [END speech_transcribe_diarization_beta]
