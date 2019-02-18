`WIP`

----

`TOC HERE`

----

# 📚 Sample Configuration Reference

```yaml
methods:
  - name: ApiMethodName
    samples:
      standalone:
      - calling_forms: ".*"
        value_sets: [sample_one]
        region_tag: sample_one
      - calling_forms: ".*"
        value_sets: [sample_two]
        region_tag: sample_two
    sample_value_sets:
    - id: sample_one
      description: This is my amazing sample
      # [ Request Definition ]
      parameters:
        defaults:
        - parent%project="Your Google Cloud Project ID"
        - config.string_field="en-US"
        - config.numeric_field=128
        - config.enum_field=VALUE_NAME
        - image.content_bytes="Path to local file, e.g. /path/image.png"
        attributes:
        - parameter: parent%project
          sample_argument_name: project_id
        - parameter: config.string_field
          sample_argument_name: the_text_value
        - parameter: image.content_bytes
          sample_argument_name: local_file_path
          read_file: true
      # [ Response Handling Definition ]
      on_success:
      - define: entities=$resp.discovery_results.entities
      - comment:
        - "Loop over all entities and print entity name."
      - loop:
          collection: entities
          collection: entity
          body:
          - print:
            - "Entity name: %s"
            - entity.name
    - id: sample_two
      description: My second sample
      # ...
```

## API Request setup

```yaml
# Request Input Parameters
parameters:

  # Assign values to fields on Request object
  defaults:
  
  # Metadata for Request fields
  # – `sample_argument_name:` – name of method argument / command-line argument
  # – `read_file:` – function accepts path to local file which is read into bytes field
  attributes:
```

### Setting request field values

#### String fields

```yaml
defaults:
- config.language_code="en-US"
```
```py
language_code = "en-US"
config = {
    'language_code': language_code
}
```

#### Numeric fields

```yaml
defaults:
- config.sample_rate_hertz=16000
```
```py
sample_rate_hertz = 16000
config = {
    'sample_rate_hertz': sample_rate_hertz
}
```

#### Enum fields

```yaml
defaults:
- config.encoding=LINEAR16
```
```py
encoding = enums.RecognitionConfig.AudioEncoding.LINEAR16
config = {
    'encoding': encoding
}
```

#### Array fields

#### Map fields

#### Byte fields

#### oneof fields

#### Project ID

```yaml
parameters:
  defaults:
  - parent%project="Your Google Cloud Project ID"
  attributes:
  - parameter: parent%project
    sample_argument_name: project_id
```
```py
def sample_list_entity_types(project_id):
    # ...
    parent = client.project_agent_path(project_id)
    
    # Iterate over all results
    for response_item in client.list_entity_types(parent):
```
```php
// $projectId = 'Your Google Cloud Project ID';
$formattedParent = $entityTypesClient->projectAgentName($projectId);
try {
    // Iterate through all elements
    $pagedResponse = $entityTypesClient->listEntityTypes($formattedParent);
// ...
```

#### Resource Paths

### Method input parameters

- Default value without `sample_argument_name`:
  ```yaml
  ...
  ```
  ```py
  ...
  ```

- Configured `sample_argument_name`:
  ```yaml
  ...
  ```
  ```py
  ...
  ```

#### Parameter naming

```yaml
parameters:
  defaults:
  - document.type=PLAIN_TEXT
  - document.content="This is a short sentence."
  attributes:
  - parameter: document.content
    sample_argument_name: text_content
```
```py
def sample_analyze_syntax(text_content):
   # ...

def main():
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument(
        '--text_content', type=str, default='This is a short sentence.')
    args = parser.parse_args()

    sample_analyze_syntax(args.text_content)
```
```php
function sampleAnalyzeSyntax($textContent)
{
    // ...
}

$opts = [
    'text_content::',
];
$defaultOptions = [
    'text_content' => 'This is a short sentence.',
];
$options = getopt('', $opts);
$options += $defaultOptions;
$textContent = $options['text_content'];
sampleAnalyzeSyntax($textContent);
```

#### Local file parameters

> Define `parameter: [byte field name]` with attribute `read_file: true`.  
> Note: field must be configured with string value in `defaults:` (used as parameter description).

```yaml
parameters:
    defaults:
    - audio.content="Path to local audio file, e.g. /path/audio.wav"
    attributes: &samples_local_file_attributes
    - parameter: audio.content
      sample_argument_name: local_file_path
      read_file: true
```
```py
import io

def sample_recognize(language_code, local_file_path):
    """Transcribe local audio file"""

    config = {
        # ...
    }
    with io.open(local_file_path, 'rb') as f:
        content = f.read()
    audio = {'content': content}

    response = client.recognize(config, audio)
    
    # ...

def main():
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument('--language_code', type=str, default='en-US')
    parser.add_argument(
        '--local_file_path',
        type=str,
        default='Path to local audio file, e.g. /path/audio.wav')
    args = parser.parse_args()

    sample_recognize(args.language_code, args.local_file_path)
```
```php
function sampleRecognize($languageCode, $localFilePath)
{
    // ...

    $content = file_get_contents($localFilePath);
    $audio = new RecognitionAudio();
    $audio->setContent($content);
    try {
        $response = $speechClient->recognize($config, $audio);
        // ...
    } finally {
        $speechClient->close();
    }
    // [END speech_transcribe_sync_core]
}
// [END speech_transcribe_sync]
$opts = [
    'language_code::',
    'local_file_path::',
];
$defaultOptions = [
    'language_code' => 'en-US',
    'local_file_path' => 'Path to local audio file, e.g. /path/audio.wav',
];
$options = getopt('', $opts);
$options += $defaultOptions;
$languageCode = $options['language_code'];
$localFilePath = $options['local_file_path'];
sampleRecognize($languageCode, $localFilePath);
```

#### Command-line interface

## API Response handling

```yaml
on_success:
```

#### Printing values

- Basic:
  ```yaml
  - print:
    - "Hello world"
  ```
  ```py
  print('Hello world)
  ```

- Interpolating values:
  ```yaml
  - print:
    - "Hello %s"
    - my_variable
  ```
  ```py
  print('Hello {}'.format(my_variable))
  ```

- Interpolating multiple variables:
  ```yaml
  - print:
    - "Hello %s and also %s"
    - my_variable
    - second_variable
  ```
  ```py
  print('Hello {} and also {}'.format(my_variable, second_variable))
  ```

- Enum values:
  ```yaml
  - print:
    - "Entity type %s"
    - entity.type
  ```
  ```py
  print('Entity type: {}'.format(enums.Entity.Type(entity.type).name))
  ```

#### Defining variables

- Basic:
  ```yaml
  - define: sentiment=$resp.document_sentiment
  ```
  ```py
  sentiment = response.document_sentiment
  ```

- Deeply nested:
  ```yaml
  - define: transcript=$resp.alternatives[0].transcript
  ```
  ```py
  transcript = response.alternatives[0].transcript
  ```
  ```php
  $transcript = $result->getAlternatives()[0]->getTranscript();
  ```

#### Loops

- Basic:
  ```yaml
  - loop:
     collection: $resp.entities
     variable: entity
     body:
     - print:
       - "Entity name: %s"
       - entity.name
  ```
  ```py
  for entity in response.entities:
        print('Entity name: {}'.format(entity.name))
  ```

- Inner loop:
  ```yaml
  - loop:
     collection: $resp.entities
     variable: entity
     body:
     - print:
       - "Entity name: %s"
       - entity.name
     - loop:
         collection: entity.mentions
         variable: mention
         body:
         - print:
           - "Mention: %s"
           - mention.text.content
  ```
  ```py
  for entity in response.entities:
      print('Entity name: {}'.format(entity.name))
      for mention in entity.mentions:
          print('Mention: {}'.format(mention.text.content))
  ```

#### Code comments

- Basic:
  ```yaml
  - comment:
    - "Defines a variable referencing the document sentiment"
  - define: sentiment=$resp.document_sentiment
  ```
  ```py
  # Defines a variable referencing the document sentiment
  sentiment = response.document_sentiment
  ```

- Variable casing:
  ```yaml
  - comment:
    - "The %s variable references the document sentiment"
    - document_sentiment
  - define: document_sentiment=$resp.document_sentiment
  ```
  ```py
  # The document_sentiment variable references the document sentiment
  document_sentiment = response.document_sentiment
  ```
  ```php
  // The documentSentiment variable references the document sentiment
  $documentSentiment = $response->getDocumentSentiment();
  ```

- Multi-line:
  ```yaml
  - comment:
    - |
         Hello world
         This is a multiline comment
  - define: sentiment=$resp.document_sentiment
  ```
  ```py
  # Hello world
  # This is a multiline comment
  sentiment = response.document_sentiment
  ```

#### Paged Responses

Response messages which contain a `next_page_token` field and a repeated field are handled specially.

Samples demonstrate language idiomatic code to cycle through the pages of results returned by the API.

In the YAML `on_success:` for these API methods, `$resp` references an individual object being paged over.
The code is implicitly rendered in a loop. 

- Example:
  ```yaml
  on_success:
  - print:
    - "Entity type name: %s"
    - $resp.name
  - print:
    - "Entity type display name: %s"
    - $resp.display_name
  ```
  ```py
  # Iterate over all results
  for response_item in client.list_entity_types(parent):
      print('Entity type name: {}'.format(response_item.name))
      print('Entity type display name: {}'.format(
          response_item.display_name))
  ```
  ```php
  try {
    // Iterate through all elements
    $pagedResponse = $entityTypesClient->listEntityTypes($formattedParent);
    foreach ($pagedResponse->iterateAllElements() as $responseItem) {
        printf('Entity type name: %s'.PHP_EOL, $responseItem->getName());
        printf('Entity type display name: %s'.PHP_EOL, $responseItem->getDisplayName());
    }
  } finally {
    $entityTypesClient->close();
  }
  ```

----

# 📚 Test Configuration Reference

`TODO`
