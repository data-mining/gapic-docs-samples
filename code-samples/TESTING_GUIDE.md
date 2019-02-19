# 📚 Test Configuration Reference

### Example

```yaml
test:
  suites:
  - name: My First Test Suite
  
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

### Logging

### Environment Variables

### UUIDs

### Test cases

### Set up

### Tear down

### Test suites

### Run sample

### Sample parameters

 - Literal
 
 - Variable

### Sample Output Assertions

### Sample Exit Code Assertions

### Run Arbitrary Executable

### Embedded Python
