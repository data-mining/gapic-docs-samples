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

/**
 * @namespace google
 */
/**
 * @namespace google.cloud
 */
/**
 * @namespace google.cloud.functions
 */
/**
 * @namespace google.cloud.functions.v1beta2
 */

'use strict';

// Import the clients for each version supported by this package.
const gapic = Object.freeze({
  v1beta2: require('./v1beta2'),
});

/**
 * The `@google-cloud/functions` package has the following named exports:
 *
 * - `CloudFunctionsServiceClient` - Reference to
 *   {@link v1beta2.CloudFunctionsServiceClient}
 * - `v1beta2` - This is used for selecting or pinning a
 *   particular backend service version. It exports:
 *     - `CloudFunctionsServiceClient` - Reference to
 *       {@link v1beta2.CloudFunctionsServiceClient}
 *
 * @module {object} @google-cloud/functions
 * @alias nodejs-functions
 *
 * @example <caption>Install the client library with <a href="https://www.npmjs.com/">npm</a>:</caption>
 * npm install --save @google-cloud/functions
 *
 * @example <caption>Import the client library:</caption>
 * const functions = require('@google-cloud/functions');
 *
 * @example <caption>Create a client that uses <a href="https://goo.gl/64dyYX">Application Default Credentials (ADC)</a>:</caption>
 * const client = new functions.CloudFunctionsServiceClient();
 *
 * @example <caption>Create a client with <a href="https://goo.gl/RXp6VL">explicit credentials</a>:</caption>
 * const client = new functions.CloudFunctionsServiceClient({
 *   projectId: 'your-project-id',
 *   keyFilename: '/path/to/keyfile.json',
 * });
 */

/**
 * @type {object}
 * @property {constructor} CloudFunctionsServiceClient
 *   Reference to {@link v1beta2.CloudFunctionsServiceClient}
 */
module.exports = gapic.v1beta2;

/**
 * @type {object}
 * @property {constructor} CloudFunctionsServiceClient
 *   Reference to {@link v1beta2.CloudFunctionsServiceClient}
 */
module.exports.v1beta2 = gapic.v1beta2;

// Alias `module.exports` as `module.exports.default`, for future-proofing.
module.exports.default = Object.assign({}, module.exports);
