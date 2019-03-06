### 🖋 Sample Authoring TODOs

Here we can track the individual samples which we have authored in YAML!

Please only cross of each individual language after confirming that the tests pass for that language.

> There may be some snippets we need to write to support test suites, e.g. if the website only displays a snippet which _creates_ a resource, our tests will need to be able to _list_ and _delete_ the same resource. We do not need to track those here, only published samples.

_If there are blocking issues, we can use this document to note them down._

#### 📜 Natural Language API

> _100% done and tested in 5 languages: Java, Go, Node.js, PHP, Python_ – [`v1`](https://github.com/beccasaurus/gapic-docs-samples/tree/master/code-samples/language/v1)

 - [Analyzing Syntax][]
   - [X] `language_syntax_text` 
   - [X] `language_syntax_gcs`
 - [Analyzing Sentiment][]
   - [X] `language_sentiment_text` 
   - [X] `language_sentiment_gcs`
 - [Analyzing Entities][]
   - [X] `language_entities_text` 
   - [X] `language_entities_gcs`
 - [Analyzing Entity Sentiment][]
   - [X] `language_entity_sentiment_text`
   - [X] `language_entity_sentiment_gcs`
 - [Classifying Content][]
   - [X] `language_classify_text`
   - [X] `language_classify_gcs`
 
[Analyzing Syntax]: https://cloud.google.com/natural-language/docs/analyzing-syntax
[Analyzing Sentiment]: https://cloud.google.com/natural-language/docs/analyzing-sentiment
[Analyzing Entities]: https://cloud.google.com/natural-language/docs/analyzing-entities
[Analyzing Entity Sentiment]: https://cloud.google.com/natural-language/docs/analyzing-entity-sentiment
[Classifying Content]: https://cloud.google.com/natural-language/docs/classifying-text

#### 👂 Speech-to-Text API

> _100% done and tested in 3 languages: Java, PHP, Python_ – [`v1`](https://github.com/beccasaurus/gapic-docs-samples/tree/master/code-samples/speech/v1) and [`v1p1beta1`](https://github.com/beccasaurus/gapic-docs-samples/tree/master/code-samples/speech/v1p1beta1)

 - [Transcribing short audio files][]
   - [X] `speech_transcribe_sync`
   - [X] `speech_transcribe_sync_gcs`
 - [Transcribing long audio files][]
   - [X] `speech_transcribe_async`
   - [X] `speech_transcribe_async_gcs`
 - [Getting word timestamps][]
   - [X] `speech_transcribe_async_word_time_offsets_gcs`
 - 🔬 Beta Features
   - [Enabling word-level confidence][]
     - [X] `speech_transcribe_word_level_confidence_beta`
   - [Separating different speakers in an audio recording][]
     - [X] `speech_transcribe_diarization_beta`
   - [Detecting language spoken automatically][]
     - [X] `speech_transcribe_multilanguage_beta`
   - [Transcribing audio with multiple channels][]
     - [X] `speech_transcribe_multichannel_beta`
   - [Using enhanced models][]
     - [X] `speech_transcribe_enhanced_model_beta`
   - [Adding recognition metadata][]
     - [X] `speech_transcribe_recognition_metadata_beta`
   - [Getting punctuation][]
     - [X] `speech_transcribe_auto_punctuation_beta`
 
 [Transcribing short audio files]: https://cloud.google.com/speech-to-text/docs/sync-recognize
 [Transcribing long audio files]: https://cloud.google.com/speech-to-text/docs/async-recognize
 [Getting word timestamps]: https://cloud.google.com/speech-to-text/docs/async-time-offsets
 [Enabling word-level confidence]: https://cloud.google.com/speech-to-text/docs/word-confidence
 [Separating different speakers in an audio recording]: https://cloud.google.com/speech-to-text/docs/multiple-voices
 [Detecting language spoken automatically]: https://cloud.google.com/speech-to-text/docs/multiple-languages
 [Transcribing audio with multiple channels]: https://cloud.google.com/speech-to-text/docs/multi-channel
 [Using enhanced models]: https://cloud.google.com/speech-to-text/docs/enhanced-models
 [Adding recognition metadata]: https://cloud.google.com/speech-to-text/docs/recognition-metadata
 [Getting punctuation]: https://cloud.google.com/speech-to-text/docs/automatic-punctuation

#### 🗣 Text-to-Speech API

 - [Creating voice audio files][] - Converting text to synthetic voice audio
   - [ ] `tts_synthesize_text`
   - [ ] `tts_synthesize_text_file`
 - [Creating voice audio files][] - Converting SSML to synthetic voice audio
   - [ ] `tts_synthesize_ssml`
   - [ ] `tts_synthesize_ssml_file`
 - [Listing all supported voices][]
   - [ ] `tts_list_voices`
 - 🔬 Beta Features
   - [Using device profiles for generated audio][] (beta)
     - [ ] `tts_synthesize_text_audio_profile_beta`
 
[Creating voice audio files]: https://cloud.google.com/text-to-speech/docs/create-audio
[Listing all supported voices]: https://cloud.google.com/text-to-speech/docs/list-voices
[Using device profiles for generated audio]: https://cloud.google.com/text-to-speech/docs/audio-profiles

#### 👁 Vision API

 - `Partial GAPIC` (_currently unsupported_)

#### 👜 Product Search API

 - [Creating a product set resource][]
   - [ ] `vision_product_search_create_product_set`
   - [ ] `vision_product_search_import_product_images`
 - [Creating and managing your product resources][]
   - [ ] `vision_product_search_create_product`
   - [ ] `vision_product_search_add_product_to_product_set`
   - [ ] `vision_product_search_remove_product_from_product_set`
 - [Creating your reference images & indexing][]
   - [ ] `vision_product_search_create_reference_image`
   - `vision_product_search_import_product_images` _(used on another page above)_
 - [Getting and listing resources][]
   - [ ] `vision_product_search_list_product_sets`
   - [ ] `vision_product_search_get_product_set`
   - [ ] `vision_product_search_list_products`
   - [ ] `vision_product_search_get_product`
   - [ ] `vision_product_search_list_reference_images`
   - [ ] `vision_product_search_get_reference_image`
 - [Updating resources][]
   - [ ] `vision_product_search_update_product_labels`
 - [Deleting resources][]
   - [ ] `vision_product_search_delete_reference_image`
   - [ ] `vision_product_search_delete_product`
   - [ ] `vision_product_search_delete_product_set`
 - [Searching for Products][]
   - [ ] `vision_product_search_get_similar_products`
   - [ ] `vision_product_search_get_similar_products_gcs`
 
[Creating a product set resource]: https://cloud.google.com/vision/product-search/docs/create-product-set
[Creating and managing your product resources]: https://cloud.google.com/vision/product-search/docs/create-product
[Creating your reference images & indexing]: https://cloud.google.com/vision/product-search/docs/create-reference-images
[Getting and listing resources]: https://cloud.google.com/vision/product-search/docs/get-list-resources
[Updating resources]: https://cloud.google.com/vision/product-search/docs/update-resources
[Deleting resources]: https://cloud.google.com/vision/product-search/docs/delete-resources
[Searching for Products]: https://cloud.google.com/vision/product-search/docs/searching

#### 🎞 Video Intelligence API

 - [Analyzing Videos for Labels][]
   - [ ] `video_analyze_labels`
   - [ ] `video_analyze_labels_gcs`
 - [Analyzing Videos for Shot Changes][]
   - [ ] `video_analyze_shots`
 - [Analyzing Videos for Explicit Content][]
   - [ ] `video_analyze_explicit_content`
 - [Speech Transcription][]
   - [ ] `video_speech_transcription_gcs`
 - 🔬 Beta Features
   - [Object Tracking][]
     - [ ] `video_object_tracking_beta`
     - [ ] `video_object_tracking_gcs_beta`
   - [Text Detection][]
     - [ ] `video_detect_text_beta`
     - [ ] `video_detect_text_gcs_beta`
 
[Analyzing Videos for Labels]: https://cloud.google.com/video-intelligence/docs/analyze-labels
[Analyzing Videos for Shot Changes]: https://cloud.google.com/video-intelligence/docs/analyze-shots
[Analyzing Videos for Explicit Content]: https://cloud.google.com/video-intelligence/docs/analyze-safesearch
[Speech Transcription]: https://cloud.google.com/video-intelligence/docs/transcription
[Object Tracking]: https://cloud.google.com/video-intelligence/docs/object-tracking
[Text Detection]: https://cloud.google.com/video-intelligence/docs/text-detection

#### 💬 Dialogflow Enterprise Edition API

- [Quickstart: Agent interaction using the API][]
  - [ ] `dialogflow_detect_intent_text`
- [Detecting Intent from Audio][]
  - [ ] `dialogflow_detect_intent_audio`
- [Creating Intents][]
  - [ ] `dialogflow_create_intent`
- [Listing and Deleting Intents][]
  - [ ] `dialogflow_list_intents`
  - [ ] `dialogflow_delete_intent`
 - 🔬 Beta Features
   - [Adding Speech Response to Detect Intent Requests][]
     - [ ] `dialogflow_detect_intent_with_texttospeech_response`
   - [Adding Sentiment Analysis to Detect Intent Requests][]
     - [ ] `dialogflow_detect_intent_with_sentiment_analysis`
   - [Knowledge Connectors][]
     - [ ] `dialogflow_create_knowledge_base`
     - [ ] `dialogflow_create_document`
     - [ ] `dialogflow_detect_intent_knowledge`

[Quickstart: Agent interaction using the API]: https://cloud.google.com/dialogflow-enterprise/docs/quickstart-api
[Detecting Intent from Audio]: https://cloud.google.com/dialogflow-enterprise/docs/detect-intent-audio
[Creating Intents]: https://cloud.google.com/dialogflow-enterprise/docs/create-intent
[Listing and Deleting Intents]: https://cloud.google.com/dialogflow-enterprise/docs/delete-intent
[Adding Speech Response to Detect Intent Requests]: https://cloud.google.com/dialogflow-enterprise/docs/detect-intent-tts
[Adding Sentiment Analysis to Detect Intent Requests]: https://cloud.google.com/dialogflow-enterprise/docs/sentiment
[Knowledge Connectors]: https://cloud.google.com/dialogflow-enterprise/docs/knowledge-connectors

#### 🧠 AutoML

 - Managing Datasets
   - 👁 [Vision](https://cloud.google.com/vision/automl/docs/datasets)
     - [ ] `automl_vision_create_dataset`
     - [ ] `automl_vision_list_datasets`
     - [ ] `automl_vision_delete_dataset`
     - [ ] `automl_vision_import_data`
   - 📜 [Natural Language](https://cloud.google.com/natural-language/automl/docs/datasets)
     - [ ] `automl_natural_language_create_dataset`
     - [ ] `automl_natural_language_list_datasets`
     - [ ] `automl_natural_language_delete_dataset`
     - [ ] `automl_natural_language_import_data`
   - 🈂️ [Translation](https://cloud.google.com/translate/automl/docs/datasets)
     - [ ] `automl_translation_create_dataset`
     - [ ] `automl_translation_list_datasets`
     - [ ] `automl_translation_delete_dataset`
     - [ ] `automl_translation_import_data`

 - Managing Models
   - 👁 [Vision](https://cloud.google.com/vision/automl/docs/models)
     - [ ] `automl_vision_create_model`
     - [ ] `automl_vision_get_model`
     - [ ] `automl_vision_list_models`
     - [ ] `automl_vision_delete_model`
   - 📜 [Natural Language](https://cloud.google.com/natural-language/automl/docs/models)
     - [ ] `automl_natural_language_create_model`
     - [ ] `automl_natural_language_get_model`
     - [ ] `automl_natural_language_list_models`
     - [ ] `automl_natural_language_delete_model`
   - 🈂️ [Translation](https://cloud.google.com/translate/automl/docs/models)
     - [ ] `automl_translation_create_model`
     - [ ] `automl_translation_get_model`
     - [ ] `automl_translation_list_models`
     - [ ] `automl_translation_delete_model`

 - Evaluating Models
   - 👁 [Vision](https://cloud.google.com/vision/automl/docs/evaluate)
     - [ ] `automl_vision_display_evaluation`
   - 📜 [Natural Language](https://cloud.google.com/natural-language/automl/docs/evaluate)
     - [ ] `automl_natural_language_display_evaluation`
   - 🈂️ [Translation](https://cloud.google.com/translate/automl/docs/evaluate)
     - [ ] `automl_translation_display_evaluation`

 - Annotating Images
   - 👁 [Vision](https://cloud.google.com/vision/automl/docs/predict)
     - [ ] `automl_vision_predict`
   - 📜 [Natural Language](https://cloud.google.com/natural-language/automl/docs/predict)
     - [ ] `automl_natural_language_predict`
   - 🈂️ [Translation](https://cloud.google.com/translate/automl/docs/predict)
     - [ ] `automl_translation_predict`

#### 💼 Job Discovery API

> **New Samples:** these do not yet appear have cloud.google.com pages 

 - [ ] `job_search_create_company`
 - [ ] `job_search_create_job`
 - [ ] `job_search_get_job`
 - [ ] `job_search_create_job_custom_attributes`
 - [ ] `job_search_create_client_event`
 - [ ] `job_search_autocomplete_job_title`
 - [ ] `job_search_histogram_search`
 - [ ] `job_search_commute_search`
 - [ ] `job_search_custom_ranking_search`
