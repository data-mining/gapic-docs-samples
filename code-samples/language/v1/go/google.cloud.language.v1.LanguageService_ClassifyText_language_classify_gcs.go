// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Code generated by protoc-gen-go_gapic. DO NOT EDIT.

package main

import (
	"context"
	"flag"
	"fmt"
	"log"

	language "cloud.google.com/go/language/apiv1"
	languagepb "google.golang.org/genproto/googleapis/cloud/language/v1"
)

// [START language_classify_gcs]

func sampleClassifyText(gcsUri string) error {
	ctx := context.Background()
	c, err := language.NewClient(ctx)
	if err != nil {
		return err
	}

	// gcsUri := "gs://cloud-samples-data/language/classify-entertainment.txt"
	req := &languagepb.ClassifyTextRequest{
		Document: &languagepb.Document{
			Type: languagepb.Document_PLAIN_TEXT,
			Source: &languagepb.Document_GcsContentUri{
				GcsContentUri: gcsUri,
			},
		},
	}
	resp, err := c.ClassifyText(ctx, req)
	if err != nil {
		return err
	}

	for _, category := range resp.GetCategories() {
		fmt.Printf("Category name: %v\n", category.GetName())
		fmt.Printf("Confidence: %v\n", category.GetConfidence())
	}
	return nil
}

// [END language_classify_gcs]

func main() {
	gcsUri := flag.String("gcs_uri", "gs://cloud-samples-data/language/classify-entertainment.txt", "")
	flag.Parse()
	if err := sampleClassifyText(*gcsUri); err != nil {
		log.Fatal(err)
	}
}