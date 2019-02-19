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

### Sample Manifest Files
