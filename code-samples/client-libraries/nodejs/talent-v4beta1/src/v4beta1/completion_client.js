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

'use strict';

const gapicConfig = require('./completion_client_config.json');
const gax = require('google-gax');
const merge = require('lodash.merge');
const path = require('path');

const VERSION = require('../../package.json').version;

/**
 * A service handles auto completion.
 *
 * @class
 * @memberof v4beta1
 */
class CompletionClient {
  /**
   * Construct an instance of CompletionClient.
   *
   * @param {object} [options] - The configuration object. See the subsequent
   *   parameters for more details.
   * @param {object} [options.credentials] - Credentials object.
   * @param {string} [options.credentials.client_email]
   * @param {string} [options.credentials.private_key]
   * @param {string} [options.email] - Account email address. Required when
   *     using a .pem or .p12 keyFilename.
   * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
   *     .p12 key downloaded from the Google Developers Console. If you provide
   *     a path to a JSON file, the projectId option below is not necessary.
   *     NOTE: .pem and .p12 require you to specify options.email as well.
   * @param {number} [options.port] - The port on which to connect to
   *     the remote host.
   * @param {string} [options.projectId] - The project ID from the Google
   *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
   *     the environment variable GCLOUD_PROJECT for your project ID. If your
   *     app is running in an environment which supports
   *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
   *     your project ID will be detected automatically.
   * @param {function} [options.promise] - Custom promise module to use instead
   *     of native Promises.
   * @param {string} [options.servicePath] - The domain name of the
   *     API remote host.
   */
  constructor(opts) {
    this._descriptors = {};

    // Ensure that options include the service address and port.
    opts = Object.assign(
      {
        clientConfig: {},
        port: this.constructor.port,
        servicePath: this.constructor.servicePath,
      },
      opts
    );

    // Create a `gaxGrpc` object, with any grpc-specific options
    // sent to the client.
    opts.scopes = this.constructor.scopes;
    const gaxGrpc = new gax.GrpcClient(opts);

    // Save the auth object to the client, for use by other methods.
    this.auth = gaxGrpc.auth;

    // Determine the client header string.
    const clientHeader = [
      `gl-node/${process.version}`,
      `grpc/${gaxGrpc.grpcVersion}`,
      `gax/${gax.version}`,
      `gapic/${VERSION}`,
    ];
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }

    // Load the applicable protos.
    const protos = merge(
      {},
      gaxGrpc.loadProto(
        path.join(__dirname, '..', '..', 'protos'),
        'google/cloud/talent/v4beta1/completion_service.proto'
      )
    );

    // This API contains "path templates"; forward-slash-separated
    // identifiers to uniquely identify resources within the API.
    // Create useful helper objects for these.
    this._pathTemplates = {
      projectPathTemplate: new gax.PathTemplate(
        'projects/{project}'
      ),
    };

    // Put together the default options sent with requests.
    const defaults = gaxGrpc.constructSettings(
      'google.cloud.talent.v4beta1.Completion',
      gapicConfig,
      opts.clientConfig,
      {'x-goog-api-client': clientHeader.join(' ')}
    );

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this._innerApiCalls = {};

    // Put together the "service stub" for
    // google.cloud.talent.v4beta1.Completion.
    const completionStub = gaxGrpc.createStub(
      protos.google.cloud.talent.v4beta1.Completion,
      opts
    );

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const completionStubMethods = [
      'completeQuery',
    ];
    for (const methodName of completionStubMethods) {
      this._innerApiCalls[methodName] = gax.createApiCall(
        completionStub.then(
          stub =>
            function() {
              const args = Array.prototype.slice.call(arguments, 0);
              return stub[methodName].apply(stub, args);
            },
          err =>
            function() {
              throw err;
            }
        ),
        defaults[methodName],
        null
      );
    }
  }

  /**
   * The DNS address for this API service.
   */
  static get servicePath() {
    return 'jobs.googleapis.com';
  }

  /**
   * The port for this API service.
   */
  static get port() {
    return 443;
  }

  /**
   * The scopes needed to make gRPC calls for every method defined
   * in this service.
   */
  static get scopes() {
    return [
      'https://www.googleapis.com/auth/cloud-platform',
      'https://www.googleapis.com/auth/jobs',
    ];
  }

  /**
   * Return the project ID used by this class.
   * @param {function(Error, string)} callback - the callback to
   *   be called with the current project Id.
   */
  getProjectId(callback) {
    return this.auth.getProjectId(callback);
  }

  // -------------------
  // -- Service calls --
  // -------------------

  /**
   * Completes the specified prefix with keyword suggestions.
   * Intended for use by a job search auto-complete search box.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   Required.
   *
   *   Resource name of project the completion is performed within.
   *
   *   The format is "projects/{project_id}", for example,
   *   "projects/api-test-project".
   * @param {string} request.query
   *   Required.
   *
   *   The query used to generate suggestions.
   *
   *   The maximum number of allowed characters is 255.
   * @param {number} request.pageSize
   *   Required.
   *
   *   Completion result count.
   *
   *   The maximum allowed page size is 10.
   * @param {string[]} [request.languageCodes]
   *   Optional.
   *
   *   The list of languages of the query. This is
   *   the BCP-47 language code, such as "en-US" or "sr-Latn".
   *   For more information, see
   *   [Tags for Identifying Languages](https://tools.ietf.org/html/bcp47).
   *
   *   For
   *   CompletionType.JOB_TITLE
   *   type, only open jobs with the same
   *   language_codes
   *   are returned.
   *
   *   For
   *   CompletionType.COMPANY_NAME
   *   type, only companies having open jobs with the same
   *   language_codes
   *   are returned.
   *
   *   For
   *   CompletionType.COMBINED
   *   type, only open jobs with the same
   *   language_codes
   *   or companies having open jobs with the same
   *   language_codes
   *   are returned.
   *
   *   The maximum number of allowed characters is 255.
   * @param {string} [request.companyName]
   *   Optional.
   *
   *   If provided, restricts completion to specified company.
   *
   *   The format is "projects/{project_id}/companies/{company_id}", for example,
   *   "projects/api-test-project/companies/foo".
   * @param {number} [request.scope]
   *   Optional.
   *
   *   The scope of the completion. The defaults is
   *   CompletionScope.PUBLIC.
   *
   *   The number should be among the values of [CompletionScope]{@link google.cloud.talent.v4beta1.CompletionScope}
   * @param {number} [request.type]
   *   Optional.
   *
   *   The completion topic. The default is
   *   CompletionType.COMBINED.
   *
   *   The number should be among the values of [CompletionType]{@link google.cloud.talent.v4beta1.CompletionType}
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is an object representing [CompleteQueryResponse]{@link google.cloud.talent.v4beta1.CompleteQueryResponse}.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [CompleteQueryResponse]{@link google.cloud.talent.v4beta1.CompleteQueryResponse}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const talent = require('@google-cloud/talent');
   *
   * const client = new talent.v4beta1.CompletionClient({
   *   // optional auth parameters.
   * });
   *
   * const formattedName = client.projectPath('[PROJECT]');
   * const query = '';
   * const pageSize = 0;
   * const request = {
   *   name: formattedName,
   *   query: query,
   *   pageSize: pageSize,
   * };
   * client.completeQuery(request)
   *   .then(responses => {
   *     const response = responses[0];
   *     // doThingsWith(response)
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  completeQuery(request, options, callback) {
    if (options instanceof Function && callback === undefined) {
      callback = options;
      options = {};
    }
    options = options || {};

    return this._innerApiCalls.completeQuery(request, options, callback);
  }

  // --------------------
  // -- Path templates --
  // --------------------

  /**
   * Return a fully-qualified project resource name string.
   *
   * @param {String} project
   * @returns {String}
   */
  projectPath(project) {
    return this._pathTemplates.projectPathTemplate.render({
      project: project,
    });
  }

  /**
   * Parse the projectName from a project resource.
   *
   * @param {String} projectName
   *   A fully-qualified path representing a project resources.
   * @returns {String} - A string representing the project.
   */
  matchProjectFromProjectName(projectName) {
    return this._pathTemplates.projectPathTemplate
      .match(projectName)
      .project;
  }
}


module.exports = CompletionClient;
