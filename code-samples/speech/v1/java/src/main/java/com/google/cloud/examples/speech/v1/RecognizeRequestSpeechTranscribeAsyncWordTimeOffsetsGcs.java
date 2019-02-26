// DO NOT EDIT! This is a generated sample ("Request",  "speech_transcribe_async_word_time_offsets_gcs")
package com.google.cloud.examples.speech.v1;

import com.google.cloud.speech.v1.RecognitionAudio;
import com.google.cloud.speech.v1.RecognitionConfig;
import com.google.cloud.speech.v1.RecognizeRequest;
import com.google.cloud.speech.v1.RecognizeResponse;
import com.google.cloud.speech.v1.SpeechClient;
import com.google.cloud.speech.v1.SpeechRecognitionAlternative;
import com.google.cloud.speech.v1.SpeechRecognitionResult;
import com.google.cloud.speech.v1.WordInfo;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.DefaultParser;
import org.apache.commons.cli.Option;
import org.apache.commons.cli.Options;

// [START speech_transcribe_async_word_time_offsets_gcs]
/*
 * Please include the following imports to run this sample.
 *
 * import com.google.cloud.speech.v1.RecognitionAudio;
 * import com.google.cloud.speech.v1.RecognitionConfig;
 * import com.google.cloud.speech.v1.RecognitionConfig;
 * import com.google.cloud.speech.v1.RecognizeRequest;
 * import com.google.cloud.speech.v1.RecognizeResponse;
 * import com.google.cloud.speech.v1.SpeechClient;
 * import com.google.cloud.speech.v1.SpeechRecognitionAlternative;
 * import com.google.cloud.speech.v1.SpeechRecognitionResult;
 * import com.google.cloud.speech.v1.WordInfo;
 */
public class RecognizeRequestSpeechTranscribeAsyncWordTimeOffsetsGcs {
  public static void sampleRecognize(String languageCode, String gcsUri) {
    // [START speech_transcribe_async_word_time_offsets_gcs_core]
    try (SpeechClient speechClient = SpeechClient.create()) {
      // String languageCode = "en-US";
      // String gcsUri = "gs://cloud-samples-data/speech/brooklyn_bridge.raw";
      int sampleRateHertz = 16000;
      RecognitionConfig.AudioEncoding encoding = RecognitionConfig.AudioEncoding.LINEAR16;
      boolean enableWordTimeOffsets = true;
      RecognitionConfig config =
          RecognitionConfig.newBuilder()
              .setSampleRateHertz(sampleRateHertz)
              .setLanguageCode(languageCode)
              .setEncoding(encoding)
              .setEnableWordTimeOffsets(enableWordTimeOffsets)
              .build();
      RecognitionAudio audio = RecognitionAudio.newBuilder().setUri(gcsUri).build();
      RecognizeRequest request =
          RecognizeRequest.newBuilder().setConfig(config).setAudio(audio).build();
      RecognizeResponse response = speechClient.recognize(request);
      System.out.printf(
          "Deeply nested: %s\n",
          response
              .getResultsList()
              .get(0)
              .getAlternativesList()
              .get(0)
              .getWordsList()
              .get(0)
              .getWord());
      for (SpeechRecognitionResult result : response.getResultsList()) {
        SpeechRecognitionAlternative alternative = result.getAlternativesList().get(0);
        System.out.printf("Transcript: %s\n", alternative.getTranscript());
        for (WordInfo wordInfo : alternative.getWordsList()) {
          System.out.printf("Word: %s\n", wordInfo.getWord());
          System.out.printf(
              "Word start time: %s seconds, %s nanos\n",
              wordInfo.getStartTime().getSeconds(), wordInfo.getStartTime().getNanos());
          System.out.printf(
              "Word end time: %s seconds, %s nanos\n",
              wordInfo.getEndTime().getSeconds(), wordInfo.getEndTime().getNanos());
        }
      }
    } catch (Exception exception) {
      System.err.println("Failed to create the client due to: " + exception);
    }
    // [END speech_transcribe_async_word_time_offsets_gcs_core]
  }

  public static void main(String[] args) throws Exception {
    Options options = new Options();
    options.addOption(
        Option.builder("").required(false).hasArg(true).longOpt("language_code").build());
    options.addOption(Option.builder("").required(false).hasArg(true).longOpt("gcs_uri").build());

    CommandLine cl = (new DefaultParser()).parse(options, args);
    String languageCode = cl.getOptionValue("language_code", "en-US");
    String gcsUri =
        cl.getOptionValue("gcs_uri", "gs://cloud-samples-data/speech/brooklyn_bridge.raw");

    sampleRecognize(languageCode, gcsUri);
  }
}
// FIXME: Insert here clean-up code.

// [END speech_transcribe_async_word_time_offsets_gcs]
