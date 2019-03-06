# 📚 Test Configuration Reference

This reference documents the YAML syntax and features of `sampletester` _(link coming soon)_.

### Example

```yaml
test:
  suites:
  - name: Managing Dog Resources
  
    setup:
      - uuid: dog_identifier
        
    teardown:
      - call_may_fail:
        target: delete_dog
          params:
            dog_id:
              variable: test_dog_id
        
    cases:
    - name: Create dog
      spec:
      - call:
          target: create_dog
          params:
            dog_id:
              variable: dog_identifier
      - assert_contains:
        - literal: "Created dog"
```

### Running tests

```
sampletester -s -v dog_crud.tests.yaml sample-files.manifest.yaml
```

```sh
# Given a directory of multiple test YAML files and one or more manifest files
sampletester -s -v *.yaml
```

```sh
-s # Write test results to console (silent by default)
```

```sh
-v # Verbose output (includes log statements and command output)
```

For information about manifest files (required for named call targets),
see [Sample Manifest Files](#sample-manifest-files) below.

### Test cases

```yaml
test:
  suites:
  - name: Name of test suite
    cases:
    
    - name: My first test case
      spec:
      - # Test definition here
      
    - name: My second test case
      spec:
      - # Test definition here
```

### Setup and teardown

```yaml
test:
  suites:
  - name: Name of test suite
    cases:
    
    - setup:
      - # These commands run *before* each test case
    
    - teardown:
      - # These commands run *after* each test case, even if the test fails
    
    - name: My first test case
      spec:
      - # Test definition here
```

### Logging

```yaml
- name: My first test case
  spec:
  - log:
    - "Hello, world!"
```
```sh
# $ sampletester -s -v *.yaml

PASSED: Test environment: "ruby"
  PASSED: Test suite: "My first test suite"
    PASSED: Test case: "My first test"
      | 
      | ### Test case SETUP
      | 
      | ### Test case TEST
      | Hello, world!
      | 
      | ### Test case TEARDOWN
      | 

Tests passed
```

> Reminder: log output is only displayed when using `-v` verbose flag.

#### Log variables

```yaml
- log:
  - "The content of variable: {}"
  - name_of_variable
```

### Environment Variables

```yaml
- env:
    name: HOME
    variable: home_directory
 
- log:
  - "My home directory: {}"
  - home_directory
```
```sh
# $ sampletester -s -v *.yaml

PASSED: Test environment: "ruby"
  PASSED: Test suite: "My first test suite"
    PASSED: Test case: "My first test"
      | 
      | ### Test case SETUP
      | 
      | ### Test case TEST
      | My home directory: /Users/beccasaurus
      | 
      | ### Test case TEARDOWN
```

### UUIDs

```yaml
- uuid: a_unique_variable
- uuid: a_different_unique_variable
 
- log:
  - "The UUIDs I generated: {} and {}"
  - a_unique_variable
  - a_different_unique_variable
```
```sh
# $ sampletester -s -v *.yaml

| ### Test case TEST
| The UUIDs I generated: cc467b2e-b59f-49df-8f97-a3d44f2b6b1b and 5a1e79ee-47bc-4702-b3fb-63566f2132aa
```

### Shell commands

```yaml
- uuid: temp_directory

- shell:
  - ls

- shell:
  - mkdir "{}"
  - temp_directory

- shell:
  - ls
```
```sh
# $ sampletester -s -v *.yaml

| ### Test case TEST
| 
| # Calling: ls
| my-first-test.tests.yaml
| targets.manifest.yaml
| 
| # Calling: mkdir "3ee0b895-1b3c-4d69-8288-b501108bc29a"
| 
| # Calling: ls
| 3ee0b895-1b3c-4d69-8288-b501108bc29a
| my-first-test.tests.yaml
| targets.manifest.yaml
| 
| ### Test case TEARDOWN
```

### Assertions

#### `assert_contains` and `assert_not_contains`

Asserts whether the output of the last executed command contains the given variable or literal string.

```yaml
assert_contains:
- literal: "This string must be contained in the last output"
```

```yaml
assert_contains:
- variable: my_uuid # This value must be contained in the last output
```

```yaml
assert_contains:
- message: "Custom message which is printed if this assertion fails"
- literal: "This string must be contained in the last output"
- variable: my_uuid # This value must also be contained in the last output
- literal: "Another string which must also be contained in the last output"
```

> 🐞 `message:` must be the first item in the list or an error is raised.

#### `assert_success` and `assert_not_success`

Asserts whether the last command failed or succeeded. Command ran successfully if exit code is `0`. 

```yaml
# Unrealistic script to demonstrate `assert_success` and `assert_failure`

ℹ️ grep returns exit code 0 when match is found, else returns 1 (failure)

# Unique UUID value to look for in a given file.
- uuid: my_unique_value

# Name of the file to look for UUID in, provided via environment variable.
- env:
    name: FILE_TO_SEARCH
    variable: file_to_search

# Verify that the file does not (yet) contain the UUID (we will append it).
- shell:
  - grep {} {}
  - my_unique_value
  - file_to_search
- assert_failure: "Expected FILE_TO_SEARCH not to include UUID but it did."

# Append the UUID to the file
- shell:
  - |
      echo "{}" >> "{}" && \
      echo "Appended value to file."
  - my_unique_value
  - file_to_search

# Verify that the file does contain the UUID (which we appended).
- shell:
  - grep {} {}
  - my_unique_value
  - file_to_search
- assert_success: "Expected FILE_TO_SEARCH to include UUID but it did not."
```

```sh
# $ FILE_TO_SEARCH=content.txt sampletester -s -v *.yaml

PASSED: Test environment: "ruby"
  PASSED: Test suite: "My first test suite"
    PASSED: Test case: "My first test"
      | 
      | ### Test case SETUP
      | 
      | ### Test case TEST
      | 
      | # Calling: grep 8d1a895a-1ee6-48d2-80d2-8dca504aa42a content.txt
      | # ... call did not succeed  
      | # Calling: echo "8d1a895a-1ee6-48d2-80d2-8dca504aa42a" >> "content.txt" && \
      | echo "Appended value to file."
      | 
      | Appended value to file.
      | 
      | # Calling: grep 8d1a895a-1ee6-48d2-80d2-8dca504aa42a content.txt
      | 8d1a895a-1ee6-48d2-80d2-8dca504aa42a
      | 
      | ### Test case TEARDOWN
      | 

Tests passed
```

### Embedded Python

> **TODO** This is _very useful_ and important! Will document soon. Feel free to contribute ;) 

#### Extracting output using Regex

`TODO`

### Named targets

Test suites can be executed against multiple executables.

This feature is generally used for compatibility testing.

 - Execute code against multiple versions of a language, e.g. Python 2 and Python 3
 - Execute scripts written in different languages to verify interface compatibility.
 
```yaml
- call:
    target: create_dog_program
```

When this test is run, the `create_dog_program` target will be executed against all defined environments.

Environments and targets are configured in [Sample Manifest Files](#sample-manifest-files). 

#### Example: Python 2 and Python 3 compatibility

```py
# create_dog.py

import sys
import os

executable_name = os.path.basename(sys.executable)

print('Hello from create_dog.py script!')
print('This script was called by: {}'.format(executable_name))
```

```yaml
# targets.manifest.yaml

version: 1
sets:

- language: Python 2
  bin: python
  __items__:
  - target: create_dog_program
    path: create_dog.py
    
- language: Python 3
  bin: python3
  __items__:
  - target: create_dog_program
    path: create_dog.py
```

```sh
# $ sampletester -s -v python-compatibility.tests.yaml targets.manifest.yaml

PASSED: Test environment: "Python 2"
  PASSED: Test suite: "My first test suite"
    PASSED: Test case: "My first test"
      | 
      | ### Test case SETUP
      | 
      | ### Test case TEST
      | 
      | # Calling: python create_dog.py 
      | Hello from create_dog.py script!
      | This script was called by: python2.7
      | 
      | ### Test case TEARDOWN
      | 
PASSED: Test environment: "Python 3"
  PASSED: Test suite: "My first test suite"
    PASSED: Test case: "My first test"
      | 
      | ### Test case SETUP
      | 
      | ### Test case TEST
      | 
      | # Calling: python create_dog.py 
      | Hello from create_dog.py script!
      | This script was called by: python3.7
      | 
      | ### Test case TEARDOWN
      | 

Tests passed
```

The same source code file (`create_dog.py`) was executed in two different configured environments: "Python 2" and "Python 3." Each environment is configured with a `bin:` executable which is used to execute the configured source files.

#### Example: Code samples in multiple languages

The same configuration can be used to test code samples written in multiple languages.

```yaml
version: 1
sets:

- language: ruby
  bin: ruby
  __items__:
  - target: create_dog
    path: create_dog.rb

- language: bash
  bin: /bin/bash
  path: ./
  __items__:
  - target: create_dog
    path: create-dog.sh
```

> 🐕 See [Dog Code Samples](https://gist.github.com/beccasaurus/e35193932257c95b22a445a5e22aca34)
> for an example test suite which asserts the correct, identical bahavior of scripts implemented in different languages.

> Includes:
> - [Code samples](https://gist.github.com/beccasaurus/e35193932257c95b22a445a5e22aca34#file-create-dog-sh) which create, list, and delete dogs.
> - Full [test suite](https://gist.github.com/beccasaurus/e35193932257c95b22a445a5e22aca34#file-dog-tests-yaml) testing samples (runs against both Ruby and BASH samples).

### Named parameters

```yaml
- call:
    target: create_dog
    params:
      dog_name:
        literal: "Rover"
```
```
ruby create_dog.rb --dog_name="Rover"
```
 
```yaml
- uuid: my_dog_identifier
- call:
    target: create_dog
    params:
      dog_name:
        variable: my_dog_identifier
```
```
ruby create_dog.rb --dog_name="703f5c10-d82b-42d2-a44a-2b88bdb49f91"
```
 
### Positional arguments

```yaml
- call:
    target: create_dog
    args:
    - literal: "Rover"
```
```
ruby create_dog.rb "Rover"
```
 
```yaml
- uuid: my_dog_identifier
- call:
    target: create_dog
    args:
    - variable: my_dog_identifier
```
```
ruby create_dog.rb "703f5c10-d82b-42d2-a44a-2b88bdb49f91"
```

```
ruby create_dog.rb "Rover"
```
 
```yaml
- uuid: my_dog_identifier
- call:
    target: create_dog
    args:
    - literal: add
    - variable: my_dog_identifier
    - literal: "--verbose"
```
```
ruby create_dog.rb add "703f5c10-d82b-42d2-a44a-2b88bdb49f91" --verbose
```

### Sample Manifest Files

To use `call: target:` to specify a script with an identifier,
a YAML manifest file must be created which defines how to call this target
across different environments (e.g. programming languages).

If you do not use `call: target:` then you do not need a manifest file.

```yaml
version: 1
sets:

- language: python
  bin: python3
  path: samples/python/
  __items__:
  - region_tag: my_sample
    path: the_sample_file.py
    
- language: executable script
  path: samples/bash/
  __items__:
  - region_tag: my_sample
    path: the_sample_file.sh
```

```yaml
language: required # Specifies the environment name (usually a programming language).
```

```yaml
bin: optional # Specifies the executable (can be excluded if files are executable).
```

```yaml
path: optional # Specifies a base path for all file paths.
```

```yaml
__items__
```

```yaml
region_tag: required # Name of the call target. 
```

```yaml
path: required # Path to the file to execute when this call target is run.
```

For more information about how sample manifests are used, see [Named targets](#named-targets).
