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

const gapicConfig = require('./cloud_functions_service_client_config');
const gax = require('google-gax');
const merge = require('lodash.merge');
const path = require('path');
const protobuf = require('protobufjs');

const VERSION = require('../../package.json').version;

/**
 * A service that application uses to manipulate triggers and functions.
 *
 * @class
 * @memberof v1beta2
 */
class CloudFunctionsServiceClient {
  /**
   * Construct an instance of CloudFunctionsServiceClient.
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
        'google/cloud/functions/v1beta2/functions.proto'
      )
    );

    // This API contains "path templates"; forward-slash-separated
    // identifiers to uniquely identify resources within the API.
    // Create useful helper objects for these.
    this._pathTemplates = {
      locationPathTemplate: new gax.PathTemplate(
        'projects/{project}/locations/{location}'
      ),
      functionPathTemplate: new gax.PathTemplate(
        'projects/{project}/locations/{location}/functions/{function}'
      ),
    };

    // Some of the methods on this service return "paged" results,
    // (e.g. 50 results at a time, with tokens to get subsequent
    // pages). Denote the keys used for pagination and results.
    this._descriptors.page = {
      listFunctions: new gax.PageDescriptor(
        'pageToken',
        'nextPageToken',
        'functions'
      ),
    };
    let protoFilesRoot = new gax.GoogleProtoFilesRoot();
    protoFilesRoot = protobuf.loadSync(
      path.join(__dirname, '..', '..', 'protos', 'google/cloud/functions/v1beta2/functions.proto'),
      protoFilesRoot
    );


    // This API contains "long-running operations", which return a
    // an Operation object that allows for tracking of the operation,
    // rather than holding a request open.
    this.operationsClient = new gax.lro({
      auth: gaxGrpc.auth,
      grpc: gaxGrpc.grpc,
    }).operationsClient(opts);

    const createFunctionResponse = protoFilesRoot.lookup(
      'google.cloud.functions.v1beta2.CloudFunction'
    );
    const createFunctionMetadata = protoFilesRoot.lookup(
      'google.cloud.functions.v1beta2.OperationMetadataV1Beta2'
    );
    const updateFunctionResponse = protoFilesRoot.lookup(
      'google.cloud.functions.v1beta2.CloudFunction'
    );
    const updateFunctionMetadata = protoFilesRoot.lookup(
      'google.cloud.functions.v1beta2.OperationMetadataV1Beta2'
    );
    const deleteFunctionResponse = protoFilesRoot.lookup(
      'google.protobuf.Empty'
    );
    const deleteFunctionMetadata = protoFilesRoot.lookup(
      'google.cloud.functions.v1beta2.OperationMetadataV1Beta2'
    );

    this._descriptors.longrunning = {
      createFunction: new gax.LongrunningDescriptor(
        this.operationsClient,
        createFunctionResponse.decode.bind(createFunctionResponse),
        createFunctionMetadata.decode.bind(createFunctionMetadata)
      ),
      updateFunction: new gax.LongrunningDescriptor(
        this.operationsClient,
        updateFunctionResponse.decode.bind(updateFunctionResponse),
        updateFunctionMetadata.decode.bind(updateFunctionMetadata)
      ),
      deleteFunction: new gax.LongrunningDescriptor(
        this.operationsClient,
        deleteFunctionResponse.decode.bind(deleteFunctionResponse),
        deleteFunctionMetadata.decode.bind(deleteFunctionMetadata)
      ),
    };

    // Put together the default options sent with requests.
    const defaults = gaxGrpc.constructSettings(
      'google.cloud.functions.v1beta2.CloudFunctionsService',
      gapicConfig,
      opts.clientConfig,
      {'x-goog-api-client': clientHeader.join(' ')}
    );

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this._innerApiCalls = {};

    // Put together the "service stub" for
    // google.cloud.functions.v1beta2.CloudFunctionsService.
    const cloudFunctionsServiceStub = gaxGrpc.createStub(
      protos.google.cloud.functions.v1beta2.CloudFunctionsService,
      opts
    );

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const cloudFunctionsServiceStubMethods = [
      'listFunctions',
      'getFunction',
      'createFunction',
      'updateFunction',
      'deleteFunction',
      'callFunction',
    ];
    for (const methodName of cloudFunctionsServiceStubMethods) {
      this._innerApiCalls[methodName] = gax.createApiCall(
        cloudFunctionsServiceStub.then(
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
        this._descriptors.page[methodName] || this._descriptors.longrunning[methodName]
      );
    }
  }

  /**
   * The DNS address for this API service.
   */
  static get servicePath() {
    return 'cloudfunctions.googleapis.com';
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
   * Returns a list of functions that belong to the requested project.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.location
   *   The project and location from which the function should be listed,
   *   specified in the format `projects/* /locations/*`
   *   If you want to list functions in all locations, use "-" in place of a
   *   location.
   * @param {number} [request.pageSize]
   *   The maximum number of resources contained in the underlying API
   *   response. If page streaming is performed per-resource, this
   *   parameter does not affect the return value. If page streaming is
   *   performed per-page, this determines the maximum number of
   *   resources in a page.
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @param {function(?Error, ?Array, ?Object, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is Array of [CloudFunction]{@link google.cloud.functions.v1beta2.CloudFunction}.
   *
   *   When autoPaginate: false is specified through options, it contains the result
   *   in a single response. If the response indicates the next page exists, the third
   *   parameter is set to be used for the next request object. The fourth parameter keeps
   *   the raw response object of an object representing [ListFunctionsResponse]{@link google.cloud.functions.v1beta2.ListFunctionsResponse}.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is Array of [CloudFunction]{@link google.cloud.functions.v1beta2.CloudFunction}.
   *
   *   When autoPaginate: false is specified through options, the array has three elements.
   *   The first element is Array of [CloudFunction]{@link google.cloud.functions.v1beta2.CloudFunction} in a single response.
   *   The second element is the next request object if the response
   *   indicates the next page exists, or null. The third element is
   *   an object representing [ListFunctionsResponse]{@link google.cloud.functions.v1beta2.ListFunctionsResponse}.
   *
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const functions = require('@google-cloud/functions');
   *
   * const client = new functions.v1beta2.CloudFunctionsServiceClient({
   *   // optional auth parameters.
   * });
   *
   * // Iterate over all elements.
   * const formattedLocation = client.locationPath('[PROJECT]', '[LOCATION]');
   *
   * client.listFunctions({location: formattedLocation})
   *   .then(responses => {
   *     const resources = responses[0];
   *     for (const resource of resources) {
   *       // doThingsWith(resource)
   *     }
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   *
   * // Or obtain the paged response.
   * const formattedLocation = client.locationPath('[PROJECT]', '[LOCATION]');
   *
   *
   * const options = {autoPaginate: false};
   * const callback = responses => {
   *   // The actual resources in a response.
   *   const resources = responses[0];
   *   // The next request if the response shows that there are more responses.
   *   const nextRequest = responses[1];
   *   // The actual response object, if necessary.
   *   // const rawResponse = responses[2];
   *   for (const resource of resources) {
   *     // doThingsWith(resource);
   *   }
   *   if (nextRequest) {
   *     // Fetch the next page.
   *     return client.listFunctions(nextRequest, options).then(callback);
   *   }
   * }
   * client.listFunctions({location: formattedLocation}, options)
   *   .then(callback)
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  listFunctions(request, options, callback) {
    if (options instanceof Function && callback === undefined) {
      callback = options;
      options = {};
    }
    options = options || {};

    return this._innerApiCalls.listFunctions(request, options, callback);
  }

  /**
   * Equivalent to {@link listFunctions}, but returns a NodeJS Stream object.
   *
   * This fetches the paged responses for {@link listFunctions} continuously
   * and invokes the callback registered for 'data' event for each element in the
   * responses.
   *
   * The returned object has 'end' method when no more elements are required.
   *
   * autoPaginate option will be ignored.
   *
   * @see {@link https://nodejs.org/api/stream.html}
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.location
   *   The project and location from which the function should be listed,
   *   specified in the format `projects/* /locations/*`
   *   If you want to list functions in all locations, use "-" in place of a
   *   location.
   * @param {number} [request.pageSize]
   *   The maximum number of resources contained in the underlying API
   *   response. If page streaming is performed per-resource, this
   *   parameter does not affect the return value. If page streaming is
   *   performed per-page, this determines the maximum number of
   *   resources in a page.
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @returns {Stream}
   *   An object stream which emits an object representing [CloudFunction]{@link google.cloud.functions.v1beta2.CloudFunction} on 'data' event.
   *
   * @example
   *
   * const functions = require('@google-cloud/functions');
   *
   * const client = new functions.v1beta2.CloudFunctionsServiceClient({
   *   // optional auth parameters.
   * });
   *
   * const formattedLocation = client.locationPath('[PROJECT]', '[LOCATION]');
   * client.listFunctionsStream({location: formattedLocation})
   *   .on('data', element => {
   *     // doThingsWith(element)
   *   }).on('error', err => {
   *     console.log(err);
   *   });
   */
  listFunctionsStream(request, options) {
    options = options || {};

    return this._descriptors.page.listFunctions.createStream(
      this._innerApiCalls.listFunctions,
      request,
      options
    );
  };

  /**
   * Returns a function with the given name from the requested project.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   The name of the function which details should be obtained.
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is an object representing [CloudFunction]{@link google.cloud.functions.v1beta2.CloudFunction}.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [CloudFunction]{@link google.cloud.functions.v1beta2.CloudFunction}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const functions = require('@google-cloud/functions');
   *
   * const client = new functions.v1beta2.CloudFunctionsServiceClient({
   *   // optional auth parameters.
   * });
   *
   * const formattedName = client.functionPath('[PROJECT]', '[LOCATION]', '[FUNCTION]');
   * client.getFunction({name: formattedName})
   *   .then(responses => {
   *     const response = responses[0];
   *     // doThingsWith(response)
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  getFunction(request, options, callback) {
    if (options instanceof Function && callback === undefined) {
      callback = options;
      options = {};
    }
    options = options || {};

    return this._innerApiCalls.getFunction(request, options, callback);
  }

  /**
   * Creates a new function. If a function with the given name already exists in
   * the specified project, the long running operation will return
   * `ALREADY_EXISTS` error.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.location
   *   The project and location in which the function should be created, specified
   *   in the format `projects/* /locations/*`
   * @param {Object} request.function_
   *   Function to be created.
   *
   *   This object should have the same structure as [CloudFunction]{@link google.cloud.functions.v1beta2.CloudFunction}
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is a [gax.Operation]{@link https://googleapis.github.io/gax-nodejs/Operation} object.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is a [gax.Operation]{@link https://googleapis.github.io/gax-nodejs/Operation} object.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const functions = require('@google-cloud/functions');
   *
   * const client = new functions.v1beta2.CloudFunctionsServiceClient({
   *   // optional auth parameters.
   * });
   *
   * const formattedLocation = client.locationPath('[PROJECT]', '[LOCATION]');
   * const function_ = {};
   * const request = {
   *   location: formattedLocation,
   *   function: function_,
   * };
   *
   * // Handle the operation using the promise pattern.
   * client.createFunction(request)
   *   .then(responses => {
   *     const [operation, initialApiResponse] = responses;
   *
   *     // Operation#promise starts polling for the completion of the LRO.
   *     return operation.promise();
   *   })
   *   .then(responses => {
   *     const result = responses[0];
   *     const metadata = responses[1];
   *     const finalApiResponse = responses[2];
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   *
   * const formattedLocation = client.locationPath('[PROJECT]', '[LOCATION]');
   * const function_ = {};
   * const request = {
   *   location: formattedLocation,
   *   function: function_,
   * };
   *
   * // Handle the operation using the event emitter pattern.
   * client.createFunction(request)
   *   .then(responses => {
   *     const [operation, initialApiResponse] = responses;
   *
   *     // Adding a listener for the "complete" event starts polling for the
   *     // completion of the operation.
   *     operation.on('complete', (result, metadata, finalApiResponse) => {
   *       // doSomethingWith(result);
   *     });
   *
   *     // Adding a listener for the "progress" event causes the callback to be
   *     // called on any change in metadata when the operation is polled.
   *     operation.on('progress', (metadata, apiResponse) => {
   *       // doSomethingWith(metadata)
   *     });
   *
   *     // Adding a listener for the "error" event handles any errors found during polling.
   *     operation.on('error', err => {
   *       // throw(err);
   *     });
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  createFunction(request, options, callback) {
    if (options instanceof Function && callback === undefined) {
      callback = options;
      options = {};
    }
    options = options || {};

    return this._innerApiCalls.createFunction(request, options, callback);
  }

  /**
   * Updates existing function.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   The name of the function to be updated.
   * @param {Object} request.function_
   *   New version of the function.
   *
   *   This object should have the same structure as [CloudFunction]{@link google.cloud.functions.v1beta2.CloudFunction}
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is a [gax.Operation]{@link https://googleapis.github.io/gax-nodejs/Operation} object.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is a [gax.Operation]{@link https://googleapis.github.io/gax-nodejs/Operation} object.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const functions = require('@google-cloud/functions');
   *
   * const client = new functions.v1beta2.CloudFunctionsServiceClient({
   *   // optional auth parameters.
   * });
   *
   * const formattedName = client.functionPath('[PROJECT]', '[LOCATION]', '[FUNCTION]');
   * const function_ = {};
   * const request = {
   *   name: formattedName,
   *   function: function_,
   * };
   *
   * // Handle the operation using the promise pattern.
   * client.updateFunction(request)
   *   .then(responses => {
   *     const [operation, initialApiResponse] = responses;
   *
   *     // Operation#promise starts polling for the completion of the LRO.
   *     return operation.promise();
   *   })
   *   .then(responses => {
   *     const result = responses[0];
   *     const metadata = responses[1];
   *     const finalApiResponse = responses[2];
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   *
   * const formattedName = client.functionPath('[PROJECT]', '[LOCATION]', '[FUNCTION]');
   * const function_ = {};
   * const request = {
   *   name: formattedName,
   *   function: function_,
   * };
   *
   * // Handle the operation using the event emitter pattern.
   * client.updateFunction(request)
   *   .then(responses => {
   *     const [operation, initialApiResponse] = responses;
   *
   *     // Adding a listener for the "complete" event starts polling for the
   *     // completion of the operation.
   *     operation.on('complete', (result, metadata, finalApiResponse) => {
   *       // doSomethingWith(result);
   *     });
   *
   *     // Adding a listener for the "progress" event causes the callback to be
   *     // called on any change in metadata when the operation is polled.
   *     operation.on('progress', (metadata, apiResponse) => {
   *       // doSomethingWith(metadata)
   *     });
   *
   *     // Adding a listener for the "error" event handles any errors found during polling.
   *     operation.on('error', err => {
   *       // throw(err);
   *     });
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  updateFunction(request, options, callback) {
    if (options instanceof Function && callback === undefined) {
      callback = options;
      options = {};
    }
    options = options || {};

    return this._innerApiCalls.updateFunction(request, options, callback);
  }

  /**
   * Deletes a function with the given name from the specified project. If the
   * given function is used by some trigger, the trigger will be updated to
   * remove this function.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   The name of the function which should be deleted.
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is a [gax.Operation]{@link https://googleapis.github.io/gax-nodejs/Operation} object.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is a [gax.Operation]{@link https://googleapis.github.io/gax-nodejs/Operation} object.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const functions = require('@google-cloud/functions');
   *
   * const client = new functions.v1beta2.CloudFunctionsServiceClient({
   *   // optional auth parameters.
   * });
   *
   * const formattedName = client.functionPath('[PROJECT]', '[LOCATION]', '[FUNCTION]');
   *
   * // Handle the operation using the promise pattern.
   * client.deleteFunction({name: formattedName})
   *   .then(responses => {
   *     const [operation, initialApiResponse] = responses;
   *
   *     // Operation#promise starts polling for the completion of the LRO.
   *     return operation.promise();
   *   })
   *   .then(responses => {
   *     const result = responses[0];
   *     const metadata = responses[1];
   *     const finalApiResponse = responses[2];
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   *
   * const formattedName = client.functionPath('[PROJECT]', '[LOCATION]', '[FUNCTION]');
   *
   * // Handle the operation using the event emitter pattern.
   * client.deleteFunction({name: formattedName})
   *   .then(responses => {
   *     const [operation, initialApiResponse] = responses;
   *
   *     // Adding a listener for the "complete" event starts polling for the
   *     // completion of the operation.
   *     operation.on('complete', (result, metadata, finalApiResponse) => {
   *       // doSomethingWith(result);
   *     });
   *
   *     // Adding a listener for the "progress" event causes the callback to be
   *     // called on any change in metadata when the operation is polled.
   *     operation.on('progress', (metadata, apiResponse) => {
   *       // doSomethingWith(metadata)
   *     });
   *
   *     // Adding a listener for the "error" event handles any errors found during polling.
   *     operation.on('error', err => {
   *       // throw(err);
   *     });
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  deleteFunction(request, options, callback) {
    if (options instanceof Function && callback === undefined) {
      callback = options;
      options = {};
    }
    options = options || {};

    return this._innerApiCalls.deleteFunction(request, options, callback);
  }

  /**
   * Invokes synchronously deployed function. To be used for testing, very
   * limited traffic allowed.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   The name of the function to be called.
   * @param {string} request.data
   *   Input to be passed to the function.
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is an object representing [CallFunctionResponse]{@link google.cloud.functions.v1beta2.CallFunctionResponse}.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [CallFunctionResponse]{@link google.cloud.functions.v1beta2.CallFunctionResponse}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const functions = require('@google-cloud/functions');
   *
   * const client = new functions.v1beta2.CloudFunctionsServiceClient({
   *   // optional auth parameters.
   * });
   *
   * const formattedName = client.functionPath('[PROJECT]', '[LOCATION]', '[FUNCTION]');
   * const data = '';
   * const request = {
   *   name: formattedName,
   *   data: data,
   * };
   * client.callFunction(request)
   *   .then(responses => {
   *     const response = responses[0];
   *     // doThingsWith(response)
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  callFunction(request, options, callback) {
    if (options instanceof Function && callback === undefined) {
      callback = options;
      options = {};
    }
    options = options || {};

    return this._innerApiCalls.callFunction(request, options, callback);
  }

  // --------------------
  // -- Path templates --
  // --------------------

  /**
   * Return a fully-qualified location resource name string.
   *
   * @param {String} project
   * @param {String} location
   * @returns {String}
   */
  locationPath(project, location) {
    return this._pathTemplates.locationPathTemplate.render({
      project: project,
      location: location,
    });
  }

  /**
   * Return a fully-qualified function resource name string.
   *
   * @param {String} project
   * @param {String} location
   * @param {String} function_
   * @returns {String}
   */
  functionPath(project, location, function_) {
    return this._pathTemplates.functionPathTemplate.render({
      project: project,
      location: location,
      function: function_,
    });
  }

  /**
   * Parse the locationName from a location resource.
   *
   * @param {String} locationName
   *   A fully-qualified path representing a location resources.
   * @returns {String} - A string representing the project.
   */
  matchProjectFromLocationName(locationName) {
    return this._pathTemplates.locationPathTemplate
      .match(locationName)
      .project;
  }

  /**
   * Parse the locationName from a location resource.
   *
   * @param {String} locationName
   *   A fully-qualified path representing a location resources.
   * @returns {String} - A string representing the location.
   */
  matchLocationFromLocationName(locationName) {
    return this._pathTemplates.locationPathTemplate
      .match(locationName)
      .location;
  }

  /**
   * Parse the functionName from a function resource.
   *
   * @param {String} functionName
   *   A fully-qualified path representing a function resources.
   * @returns {String} - A string representing the project.
   */
  matchProjectFromFunctionName(functionName) {
    return this._pathTemplates.functionPathTemplate
      .match(functionName)
      .project;
  }

  /**
   * Parse the functionName from a function resource.
   *
   * @param {String} functionName
   *   A fully-qualified path representing a function resources.
   * @returns {String} - A string representing the location.
   */
  matchLocationFromFunctionName(functionName) {
    return this._pathTemplates.functionPathTemplate
      .match(functionName)
      .location;
  }

  /**
   * Parse the functionName from a function resource.
   *
   * @param {String} functionName
   *   A fully-qualified path representing a function resources.
   * @returns {String} - A string representing the function.
   */
  matchFunctionFromFunctionName(functionName) {
    return this._pathTemplates.functionPathTemplate
      .match(functionName)
      .function;
  }
}


module.exports = CloudFunctionsServiceClient;
