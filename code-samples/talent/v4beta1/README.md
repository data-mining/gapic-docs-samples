To add or modify code samples for `Talent v4beta1`, edit the GAPIC config:

📝 [google/cloud/talent/v4beta1/talent_gapic.yaml](https://github.com/beccasaurus/gapic-docs-samples/blob/master/google/cloud/talent/v4beta1/talent_gapic.yaml)

```sh
cd gapic-docs-samples/code-samples

vi ../google/cloud/talent/v4beta1/talent_gapic.yaml
# or ./script/edit talent v4beta1 

# make changes! see SAMPLE_GUIDE for syntax reference

./script/generate talent v4beta1 go

# or
./script/generate talent v4beta1 python
./script/generate talent v4beta1 nodejs
./script/generate talent v4beta1 php
```

----

### 🐹 Go

```sh
go get cloud.google.com/go/talent/apiv4beta1

export GOOGLE_PROJECT_ID="Your Google Cloud Project ID"

$ go run talent/v4beta1/go/*create_company.go --project_id=$GOOGLE_PROJECT_ID --display_name="My Wonderful Company"
Created company: My Wonderful Company
Company name: projects/rebecca-gcp/companies/c42bda63-a1a1-4646-8a8a-8ef4fe588ef4

$ go run talent/v4beta1/go/*list_companies.go --project_id=$GOOGLE_PROJECT_ID
Company: projects/rebecca-gcp/companies/c42bda63-a1a1-4646-8a8a-8ef4fe588ef4
Display name: My Wonderful Company

$ go run talent/v4beta1/go/*delete_company.go --project_id=$GOOGLE_PROJECT_ID --company_id="c42bda63-a1a1-4646-8a8a-8ef4fe588ef4"
Deleted company
```
