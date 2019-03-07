## 🏆 Canonical Code Samples

This directory contains code samples in all languages which demonstrate various types of samples.

The samples here are intended to represent the _ideal_ output of the sample generator.

The samples here are intended to represent the _current standard_ of the hand-written samples.

 ###  Canonical Sample Examples

| Language | Synchronous | Long-running operation | File input | File output | Resource Paths | 
|----------|-------------|------------------------|------------|-------------|----------------|
| #️⃣ **C#** | [**✗**][sync_cs] | | | | |
| 🐹 **Go** | | | | | |
| ☕️ **Java** | | | | | |
| 🚀 **Node.js** | [**✗**][sync_js] | | | | |
| 🐘 **PHP** | | | | | |
| 🐍 **Python** | [**✗**][sync_py] | | | | |
| 💎 **Ruby** | [**✗**][sync_rb] | | | | |

#### Synchronous API Request

For this sample, we use a simple Natural Language API call for `AnalyzeSentiment`

#### Long-Running Operation

For this sample, we use Cloud Speech `LongRunningRecognize` with a GCS path to audio file

#### Local File Input Parameter

For this sample, we use Cloud Speech `Recognize` with a local file path to audio file
 
#### Project ID Resource Paths

For this sample, we use Dialogflow `CreateEntityType` which uses resource paths

[sync_cs]: dotnet/SynchronousApiRequest/SynchronousApiRequest.cs
[sync_js]: nodejs/synchronous_api_request.js
[sync_py]: python/synchronous_api_request.py
[sync_rb]: ruby/synchronous_api_request.rb
