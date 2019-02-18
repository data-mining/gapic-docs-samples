`WIP`

----

# 📚 Sample Configuration Reference

## API Request setup

### Setting request field values

#### String fields

#### Numeric fields

#### Enum fields

#### Array fields

#### Map fields

#### Byte fields

#### oneof fields

### Method input parameters

#### Parameter naming

#### Local file parameters

#### Command-line interface

## API Response handling

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
