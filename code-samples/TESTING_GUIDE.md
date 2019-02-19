# 📚 Test Configuration Reference

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
      # Test definition here
      
    - name: My second test case
      spec:
      # Test definition here
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

##### Logging variables

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

### Set up

### Tear down

### Test suites

### Shell commands

### Named targets


### Call target parameters

 - Literal
 
 - Variable

### Sample Output Assertions

### Sample Exit Code Assertions

### Run Arbitrary Executable

### Embedded Python

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
