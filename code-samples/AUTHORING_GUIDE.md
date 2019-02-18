`TODO`

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
  transcript=response.alternatives[0].transcript
  ```

#### Loops

#### Code comments

#### Paged Responses

----

# 📚 Test Configuration Reference

`TODO`
