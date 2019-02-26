// DO NOT EDIT! This is a generated sample ("Request",  "speech_transcribe_sync_gcs")
package com.google.cloud.examples.speech.v1;

import com.google.cloud.speech.v1.RecognitionAudio;
import com.google.cloud.speech.v1.RecognitionConfig;
import com.google.cloud.speech.v1.RecognizeRequest;
import com.google.cloud.speech.v1.RecognizeResponse;
import com.google.cloud.speech.v1.SpeechClient;
import com.google.cloud.speech.v1.SpeechRecognitionResult;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.DefaultParser;
import org.apache.commons.cli.Option;
import org.apache.commons.cli.Options;

// [START speech_transcribe_sync_gcs]
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
 */
public class RecognizeRequestSpeechTranscribeSyncGcs {
  public static void sampleRecognize(String languageCode, String gcsUri) {
    // [START speech_transcribe_sync_gcs_core]
    try (SpeechClient speechClient = SpeechClient.create()) {
      // String languageCode = "en-US";
      // String gcsUri = "gs://cloud-samples-data/speech/brooklyn_bridge.raw";
      int sampleRateHertz = 16000;
      RecognitionConfig.AudioEncoding encoding = RecognitionConfig.AudioEncoding.LINEAR16;
      RecognitionConfig config =
          RecognitionConfig.newBuilder()
              .setSampleRateHertz(sampleRateHertz)
              .setLanguageCode(languageCode)
              .setEncoding(encoding)
              .build();
      RecognitionAudio audio = RecognitionAudio.newBuilder().setUri(gcsUri).build();
      RecognizeRequest request =
          RecognizeRequest.newBuilder().setConfig(config).setAudio(audio).build();
      RecognizeResponse response = speechClient.recognize(request);
      for (SpeechRecognitionResult result : response.getResultsList()) {
        System.out.printf("Transcript: %s\n", result.getAlternativesList().get(0).getTranscript());
      }
    } catch (Exception exception) {
      System.err.println("Failed to create the client due to: " + exception);
    }
    // [END speech_transcribe_sync_gcs_core]
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

// [END speech_transcribe_sync_gcs]
