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

const assert = require('assert');

const functionsModule = require('../src');

const FAKE_STATUS_CODE = 1;
const error = new Error();
error.code = FAKE_STATUS_CODE;

describe('CloudFunctionsServiceClient', () => {
  describe('listFunctions', () => {
    it('invokes listFunctions without error', done => {
      const client = new functionsModule.v1beta2.CloudFunctionsServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedLocation = client.locationPath('[PROJECT]', '[LOCATION]');
      const request = {
        location: formattedLocation,
      };

      // Mock response
      const nextPageToken = '';
      const functionsElement = {};
      const functions = [functionsElement];
      const expectedResponse = {
        nextPageToken: nextPageToken,
        functions: functions,
      };

      // Mock Grpc layer
      client._innerApiCalls.listFunctions = (actualRequest, options, callback) => {
        assert.deepStrictEqual(actualRequest, request);
        callback(null, expectedResponse.functions);
      };

      client.listFunctions(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse.functions);
        done();
      });
    });

    it('invokes listFunctions with error', done => {
      const client = new functionsModule.v1beta2.CloudFunctionsServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedLocation = client.locationPath('[PROJECT]', '[LOCATION]');
      const request = {
        location: formattedLocation,
      };

      // Mock Grpc layer
      client._innerApiCalls.listFunctions = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.listFunctions(request, (err, response) => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });

  describe('getFunction', () => {
    it('invokes getFunction without error', done => {
      const client = new functionsModule.v1beta2.CloudFunctionsServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.functionPath('[PROJECT]', '[LOCATION]', '[FUNCTION]');
      const request = {
        name: formattedName,
      };

      // Mock response
      const name2 = 'name2-1052831874';
      const sourceArchiveUrl = 'sourceArchiveUrl-289007026';
      const latestOperation = 'latestOperation-1633164625';
      const entryPoint = 'entryPoint-799136893';
      const availableMemoryMb = 1964533661;
      const serviceAccount = 'serviceAccount-1948028253';
      const expectedResponse = {
        name: name2,
        sourceArchiveUrl: sourceArchiveUrl,
        latestOperation: latestOperation,
        entryPoint: entryPoint,
        availableMemoryMb: availableMemoryMb,
        serviceAccount: serviceAccount,
      };

      // Mock Grpc layer
      client._innerApiCalls.getFunction = mockSimpleGrpcMethod(
        request,
        expectedResponse
      );

      client.getFunction(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes getFunction with error', done => {
      const client = new functionsModule.v1beta2.CloudFunctionsServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.functionPath('[PROJECT]', '[LOCATION]', '[FUNCTION]');
      const request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.getFunction = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.getFunction(request, (err, response) => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });

  describe('createFunction', function() {
    it('invokes createFunction without error', done => {
      const client = new functionsModule.v1beta2.CloudFunctionsServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedLocation = client.locationPath('[PROJECT]', '[LOCATION]');
      const function_ = {};
      const request = {
        location: formattedLocation,
        function: function_,
      };

      // Mock response
      const name = 'name3373707';
      const sourceArchiveUrl = 'sourceArchiveUrl-289007026';
      const latestOperation = 'latestOperation-1633164625';
      const entryPoint = 'entryPoint-799136893';
      const availableMemoryMb = 1964533661;
      const serviceAccount = 'serviceAccount-1948028253';
      const expectedResponse = {
        name: name,
        sourceArchiveUrl: sourceArchiveUrl,
        latestOperation: latestOperation,
        entryPoint: entryPoint,
        availableMemoryMb: availableMemoryMb,
        serviceAccount: serviceAccount,
      };

      // Mock Grpc layer
      client._innerApiCalls.createFunction = mockLongRunningGrpcMethod(request, expectedResponse);

      client.createFunction(request).then(responses => {
        const operation = responses[0];
        return operation.promise();
      }).then(responses => {
        assert.deepStrictEqual(responses[0], expectedResponse);
        done();
      }).catch(err => {
        done(err);
      });
    });

    it('invokes createFunction with error', done => {
      const client = new functionsModule.v1beta2.CloudFunctionsServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedLocation = client.locationPath('[PROJECT]', '[LOCATION]');
      const function_ = {};
      const request = {
        location: formattedLocation,
        function: function_,
      };

      // Mock Grpc layer
      client._innerApiCalls.createFunction = mockLongRunningGrpcMethod(request, null, error);

      client.createFunction(request).then(responses => {
        const operation = responses[0];
        return operation.promise();
      }).then(() => {
        assert.fail();
      }).catch(err => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        done();
      });
    });

    it('has longrunning decoder functions', () => {
      const client = new functionsModule.v1beta2.CloudFunctionsServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      assert(client._descriptors.longrunning.createFunction.responseDecoder instanceof Function);
      assert(client._descriptors.longrunning.createFunction.metadataDecoder instanceof Function);
    });
  });

  describe('updateFunction', function() {
    it('invokes updateFunction without error', done => {
      const client = new functionsModule.v1beta2.CloudFunctionsServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.functionPath('[PROJECT]', '[LOCATION]', '[FUNCTION]');
      const function_ = {};
      const request = {
        name: formattedName,
        function: function_,
      };

      // Mock response
      const name2 = 'name2-1052831874';
      const sourceArchiveUrl = 'sourceArchiveUrl-289007026';
      const latestOperation = 'latestOperation-1633164625';
      const entryPoint = 'entryPoint-799136893';
      const availableMemoryMb = 1964533661;
      const serviceAccount = 'serviceAccount-1948028253';
      const expectedResponse = {
        name: name2,
        sourceArchiveUrl: sourceArchiveUrl,
        latestOperation: latestOperation,
        entryPoint: entryPoint,
        availableMemoryMb: availableMemoryMb,
        serviceAccount: serviceAccount,
      };

      // Mock Grpc layer
      client._innerApiCalls.updateFunction = mockLongRunningGrpcMethod(request, expectedResponse);

      client.updateFunction(request).then(responses => {
        const operation = responses[0];
        return operation.promise();
      }).then(responses => {
        assert.deepStrictEqual(responses[0], expectedResponse);
        done();
      }).catch(err => {
        done(err);
      });
    });

    it('invokes updateFunction with error', done => {
      const client = new functionsModule.v1beta2.CloudFunctionsServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.functionPath('[PROJECT]', '[LOCATION]', '[FUNCTION]');
      const function_ = {};
      const request = {
        name: formattedName,
        function: function_,
      };

      // Mock Grpc layer
      client._innerApiCalls.updateFunction = mockLongRunningGrpcMethod(request, null, error);

      client.updateFunction(request).then(responses => {
        const operation = responses[0];
        return operation.promise();
      }).then(() => {
        assert.fail();
      }).catch(err => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        done();
      });
    });

    it('has longrunning decoder functions', () => {
      const client = new functionsModule.v1beta2.CloudFunctionsServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      assert(client._descriptors.longrunning.updateFunction.responseDecoder instanceof Function);
      assert(client._descriptors.longrunning.updateFunction.metadataDecoder instanceof Function);
    });
  });

  describe('deleteFunction', function() {
    it('invokes deleteFunction without error', done => {
      const client = new functionsModule.v1beta2.CloudFunctionsServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.functionPath('[PROJECT]', '[LOCATION]', '[FUNCTION]');
      const request = {
        name: formattedName,
      };

      // Mock response
      const expectedResponse = {};

      // Mock Grpc layer
      client._innerApiCalls.deleteFunction = mockLongRunningGrpcMethod(request, expectedResponse);

      client.deleteFunction(request).then(responses => {
        const operation = responses[0];
        return operation.promise();
      }).then(responses => {
        assert.deepStrictEqual(responses[0], expectedResponse);
        done();
      }).catch(err => {
        done(err);
      });
    });

    it('invokes deleteFunction with error', done => {
      const client = new functionsModule.v1beta2.CloudFunctionsServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.functionPath('[PROJECT]', '[LOCATION]', '[FUNCTION]');
      const request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.deleteFunction = mockLongRunningGrpcMethod(request, null, error);

      client.deleteFunction(request).then(responses => {
        const operation = responses[0];
        return operation.promise();
      }).then(() => {
        assert.fail();
      }).catch(err => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        done();
      });
    });

    it('has longrunning decoder functions', () => {
      const client = new functionsModule.v1beta2.CloudFunctionsServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      assert(client._descriptors.longrunning.deleteFunction.responseDecoder instanceof Function);
      assert(client._descriptors.longrunning.deleteFunction.metadataDecoder instanceof Function);
    });
  });

  describe('callFunction', () => {
    it('invokes callFunction without error', done => {
      const client = new functionsModule.v1beta2.CloudFunctionsServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.functionPath('[PROJECT]', '[LOCATION]', '[FUNCTION]');
      const data = 'data3076010';
      const request = {
        name: formattedName,
        data: data,
      };

      // Mock response
      const executionId = 'executionId-1217171550';
      const result = 'result-934426595';
      const error = 'error96784904';
      const expectedResponse = {
        executionId: executionId,
        result: result,
        error: error,
      };

      // Mock Grpc layer
      client._innerApiCalls.callFunction = mockSimpleGrpcMethod(
        request,
        expectedResponse
      );

      client.callFunction(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes callFunction with error', done => {
      const client = new functionsModule.v1beta2.CloudFunctionsServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.functionPath('[PROJECT]', '[LOCATION]', '[FUNCTION]');
      const data = 'data3076010';
      const request = {
        name: formattedName,
        data: data,
      };

      // Mock Grpc layer
      client._innerApiCalls.callFunction = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.callFunction(request, (err, response) => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });

});

function mockSimpleGrpcMethod(expectedRequest, response, error) {
  return function(actualRequest, options, callback) {
    assert.deepStrictEqual(actualRequest, expectedRequest);
    if (error) {
      callback(error);
    } else if (response) {
      callback(null, response);
    } else {
      callback(null);
    }
  };
}

function mockLongRunningGrpcMethod(expectedRequest, response, error) {
  return request => {
    assert.deepStrictEqual(request, expectedRequest);
    const mockOperation = {
      promise: function() {
        return new Promise((resolve, reject) => {
          if (error) {
            reject(error);
          }
          else {
            resolve([response]);
          }
        });
      }
    };
    return Promise.resolve([mockOperation]);
  };
}
