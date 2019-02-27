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

// Note: this file is purely for documentation. Any contents are not expected
// to be loaded as the JS file.

/**
 * Describes a Cloud Function that contains user computation executed in
 * response to an event. It encapsulate function and triggers configurations.
 *
 * @property {string} name
 *   A user-defined name of the function. Function names must be unique
 *   globally and match pattern `projects/* /locations/* /functions/*`
 *
 * @property {string} sourceArchiveUrl
 *   The URL, starting with gs://, pointing to the zip archive which contains
 *   the function.
 *
 * @property {Object} sourceRepository
 *   The hosted repository where the function is defined.
 *
 *   This object should have the same structure as [SourceRepository]{@link google.cloud.functions.v1beta2.SourceRepository}
 *
 * @property {Object} httpsTrigger
 *   An HTTPS endpoint type of source that can be triggered via URL.
 *
 *   This object should have the same structure as [HTTPSTrigger]{@link google.cloud.functions.v1beta2.HTTPSTrigger}
 *
 * @property {Object} eventTrigger
 *   A source that fires events in response to a condition in another service.
 *
 *   This object should have the same structure as [EventTrigger]{@link google.cloud.functions.v1beta2.EventTrigger}
 *
 * @property {number} status
 *   Output only. Status of the function deployment.
 *
 *   The number should be among the values of [CloudFunctionStatus]{@link google.cloud.functions.v1beta2.CloudFunctionStatus}
 *
 * @property {string} latestOperation
 *   Output only. Name of the most recent operation modifying the function. If
 *   the function status is `DEPLOYING` or `DELETING`, then it points to the
 *   active operation.
 *
 * @property {string} entryPoint
 *   The name of the function (as defined in source code) that will be
 *   executed. Defaults to the resource name suffix, if not specified. For
 *   backward compatibility, if function with given name is not found, then the
 *   system will try to use function named "function".
 *   For Node.js this is name of a function exported by the module specified
 *   in `source_location`.
 *
 * @property {Object} timeout
 *   The function execution timeout. Execution is considered failed and
 *   can be terminated if the function is not completed at the end of the
 *   timeout period. Defaults to 60 seconds.
 *
 *   This object should have the same structure as [Duration]{@link google.protobuf.Duration}
 *
 * @property {number} availableMemoryMb
 *   The amount of memory in MB available for a function.
 *   Defaults to 256MB.
 *
 * @property {string} serviceAccount
 *   Output only. The service account of the function.
 *
 * @property {Object} updateTime
 *   Output only. The last update timestamp of a Cloud Function.
 *
 *   This object should have the same structure as [Timestamp]{@link google.protobuf.Timestamp}
 *
 * @typedef CloudFunction
 * @memberof google.cloud.functions.v1beta2
 * @see [google.cloud.functions.v1beta2.CloudFunction definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/cloud/functions/v1beta2/functions.proto}
 */
const CloudFunction = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Describes HTTPSTrigger, could be used to connect web hooks to function.
 *
 * @property {string} url
 *   Output only. The deployed url for the function.
 *
 * @typedef HTTPSTrigger
 * @memberof google.cloud.functions.v1beta2
 * @see [google.cloud.functions.v1beta2.HTTPSTrigger definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/cloud/functions/v1beta2/functions.proto}
 */
const HTTPSTrigger = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Describes EventTrigger, used to request events be sent from another
 * service.
 *
 * @property {string} eventType
 *   `event_type` names contain the service that is sending an event and the
 *   kind of event that was fired. Must be of the form
 *   `providers/* /eventTypes/*` e.g. Directly handle a Message published to
 *   Google Cloud Pub/Sub `providers/cloud.pubsub/eventTypes/topic.publish`
 *
 *        Handle an object changing in Google Cloud Storage
 *        `providers/cloud.storage/eventTypes/object.change`
 *
 *        Handle a write to the Firebase Realtime Database
 *        `providers/firebase.database/eventTypes/data.write`
 *
 * @property {string} resource
 *   Which instance of the source's service should send events. E.g. for Pub/Sub
 *   this would be a Pub/Sub topic at `projects/* /topics/*`. For Google Cloud
 *   Storage this would be a bucket at `projects/* /buckets/*`. For any source
 *   that only supports one instance per-project, this should be the name of the
 *   project (`projects/*`)
 *
 * @typedef EventTrigger
 * @memberof google.cloud.functions.v1beta2
 * @see [google.cloud.functions.v1beta2.EventTrigger definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/cloud/functions/v1beta2/functions.proto}
 */
const EventTrigger = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Describes the location of the function source in a remote repository.
 *
 * @property {string} repositoryUrl
 *   URL to the hosted repository where the function is defined. Only paths in
 *   https://source.developers.google.com domain are supported. The path should
 *   contain the name of the repository.
 *
 * @property {string} sourcePath
 *   The path within the repository where the function is defined. The path
 *   should point to the directory where Cloud Functions files are located. Use
 *   "/" if the function is defined directly in the root directory of a
 *   repository.
 *
 * @property {string} branch
 *   The name of the branch from which the function should be fetched.
 *
 * @property {string} tag
 *   The name of the tag that captures the state of the repository from
 *   which the function should be fetched.
 *
 * @property {string} revision
 *   The id of the revision that captures the state of the repository from
 *   which the function should be fetched.
 *
 * @property {string} deployedRevision
 *   Output only. The id of the revision that was resolved at the moment of
 *   function creation or update. For example when a user deployed from a
 *   branch, it will be the revision id of the latest change on this branch at
 *   that time. If user deployed from revision then this value will be always
 *   equal to the revision specified by the user.
 *
 * @typedef SourceRepository
 * @memberof google.cloud.functions.v1beta2
 * @see [google.cloud.functions.v1beta2.SourceRepository definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/cloud/functions/v1beta2/functions.proto}
 */
const SourceRepository = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Request for the `CreateFunction` method.
 *
 * @property {string} location
 *   The project and location in which the function should be created, specified
 *   in the format `projects/* /locations/*`
 *
 * @property {Object} function
 *   Function to be created.
 *
 *   This object should have the same structure as [CloudFunction]{@link google.cloud.functions.v1beta2.CloudFunction}
 *
 * @typedef CreateFunctionRequest
 * @memberof google.cloud.functions.v1beta2
 * @see [google.cloud.functions.v1beta2.CreateFunctionRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/cloud/functions/v1beta2/functions.proto}
 */
const CreateFunctionRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Request for the `UpdateFunction` method.
 *
 * @property {string} name
 *   The name of the function to be updated.
 *
 * @property {Object} function
 *   New version of the function.
 *
 *   This object should have the same structure as [CloudFunction]{@link google.cloud.functions.v1beta2.CloudFunction}
 *
 * @typedef UpdateFunctionRequest
 * @memberof google.cloud.functions.v1beta2
 * @see [google.cloud.functions.v1beta2.UpdateFunctionRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/cloud/functions/v1beta2/functions.proto}
 */
const UpdateFunctionRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Request for the `GetFunction` method.
 *
 * @property {string} name
 *   The name of the function which details should be obtained.
 *
 * @typedef GetFunctionRequest
 * @memberof google.cloud.functions.v1beta2
 * @see [google.cloud.functions.v1beta2.GetFunctionRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/cloud/functions/v1beta2/functions.proto}
 */
const GetFunctionRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Request for the `ListFunctions` method.
 *
 * @property {string} location
 *   The project and location from which the function should be listed,
 *   specified in the format `projects/* /locations/*`
 *   If you want to list functions in all locations, use "-" in place of a
 *   location.
 *
 * @property {number} pageSize
 *   Maximum number of functions to return per call.
 *
 * @property {string} pageToken
 *   The value returned by the last
 *   `ListFunctionsResponse`; indicates that
 *   this is a continuation of a prior `ListFunctions` call, and that the
 *   system should return the next page of data.
 *
 * @typedef ListFunctionsRequest
 * @memberof google.cloud.functions.v1beta2
 * @see [google.cloud.functions.v1beta2.ListFunctionsRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/cloud/functions/v1beta2/functions.proto}
 */
const ListFunctionsRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Response for the `ListFunctions` method.
 *
 * @property {Object[]} functions
 *   The functions that match the request.
 *
 *   This object should have the same structure as [CloudFunction]{@link google.cloud.functions.v1beta2.CloudFunction}
 *
 * @property {string} nextPageToken
 *   If not empty, indicates that there may be more functions that match
 *   the request; this value should be passed in a new
 *   google.cloud.functions.v1beta2.ListFunctionsRequest
 *   to get more functions.
 *
 * @typedef ListFunctionsResponse
 * @memberof google.cloud.functions.v1beta2
 * @see [google.cloud.functions.v1beta2.ListFunctionsResponse definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/cloud/functions/v1beta2/functions.proto}
 */
const ListFunctionsResponse = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Request for the `DeleteFunction` method.
 *
 * @property {string} name
 *   The name of the function which should be deleted.
 *
 * @typedef DeleteFunctionRequest
 * @memberof google.cloud.functions.v1beta2
 * @see [google.cloud.functions.v1beta2.DeleteFunctionRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/cloud/functions/v1beta2/functions.proto}
 */
const DeleteFunctionRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Request for the `CallFunction` method.
 *
 * @property {string} name
 *   The name of the function to be called.
 *
 * @property {string} data
 *   Input to be passed to the function.
 *
 * @typedef CallFunctionRequest
 * @memberof google.cloud.functions.v1beta2
 * @see [google.cloud.functions.v1beta2.CallFunctionRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/cloud/functions/v1beta2/functions.proto}
 */
const CallFunctionRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Response of `CallFunction` method.
 *
 * @property {string} executionId
 *   Execution id of function invocation.
 *
 * @property {string} result
 *   Result populated for successful execution of synchronous function. Will
 *   not be populated if function does not return a result through context.
 *
 * @property {string} error
 *   Either system or user-function generated error. Set if execution
 *   was not successful.
 *
 * @typedef CallFunctionResponse
 * @memberof google.cloud.functions.v1beta2
 * @see [google.cloud.functions.v1beta2.CallFunctionResponse definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/cloud/functions/v1beta2/functions.proto}
 */
const CallFunctionResponse = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Describes the current stage of a deployment.
 *
 * @enum {number}
 * @memberof google.cloud.functions.v1beta2
 */
const CloudFunctionStatus = {

  /**
   * Status not specified.
   */
  STATUS_UNSPECIFIED: 0,

  /**
   * Successfully deployed.
   */
  READY: 1,

  /**
   * Not deployed correctly - behavior is undefined. The item should be updated
   * or deleted to move it out of this state.
   */
  FAILED: 2,

  /**
   * Creation or update in progress.
   */
  DEPLOYING: 3,

  /**
   * Deletion in progress.
   */
  DELETING: 4
};