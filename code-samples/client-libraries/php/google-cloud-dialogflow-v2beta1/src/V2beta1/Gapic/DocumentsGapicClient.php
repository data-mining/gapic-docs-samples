<?php
/*
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * GENERATED CODE WARNING
 * This file was generated from the file
 * https://github.com/google/googleapis/blob/master/google/cloud/dialogflow/v2beta1/document.proto
 * and updates to that file get reflected here through a refresh process.
 *
 * @experimental
 */

namespace Google\Cloud\Dialogflow\V2beta1\Gapic;

use Google\ApiCore\ApiException;
use Google\ApiCore\CredentialsWrapper;
use Google\ApiCore\GapicClientTrait;
use Google\ApiCore\LongRunning\OperationsClient;
use Google\ApiCore\OperationResponse;
use Google\ApiCore\PathTemplate;
use Google\ApiCore\RetrySettings;
use Google\ApiCore\Transport\TransportInterface;
use Google\ApiCore\ValidationException;
use Google\Auth\FetchAuthTokenInterface;
use Google\Cloud\Dialogflow\V2beta1\CreateDocumentRequest;
use Google\Cloud\Dialogflow\V2beta1\DeleteDocumentRequest;
use Google\Cloud\Dialogflow\V2beta1\Document;
use Google\Cloud\Dialogflow\V2beta1\GetDocumentRequest;
use Google\Cloud\Dialogflow\V2beta1\KnowledgeOperationMetadata;
use Google\Cloud\Dialogflow\V2beta1\ListDocumentsRequest;
use Google\Cloud\Dialogflow\V2beta1\ListDocumentsResponse;
use Google\LongRunning\Operation;

/**
 * Service Description: Manages documents of a knowledge base.
 *
 * This class provides the ability to make remote calls to the backing service through method
 * calls that map to API methods. Sample code to get started:
 *
 * ```
 * $documentsClient = new DocumentsClient();
 * try {
 *     $formattedParent = $documentsClient->knowledgeBaseName('[PROJECT]', '[KNOWLEDGE_BASE]');
 *     // Iterate over pages of elements
 *     $pagedResponse = $documentsClient->listDocuments($formattedParent);
 *     foreach ($pagedResponse->iteratePages() as $page) {
 *         foreach ($page as $element) {
 *             // doSomethingWith($element);
 *         }
 *     }
 *
 *
 *     // Alternatively:
 *
 *     // Iterate through all elements
 *     $pagedResponse = $documentsClient->listDocuments($formattedParent);
 *     foreach ($pagedResponse->iterateAllElements() as $element) {
 *         // doSomethingWith($element);
 *     }
 * } finally {
 *     $documentsClient->close();
 * }
 * ```
 *
 * Many parameters require resource names to be formatted in a particular way. To assist
 * with these names, this class includes a format method for each type of name, and additionally
 * a parseName method to extract the individual identifiers contained within formatted names
 * that are returned by the API.
 *
 * @experimental
 */
class DocumentsGapicClient
{
    use GapicClientTrait;

    /**
     * The name of the service.
     */
    const SERVICE_NAME = 'google.cloud.dialogflow.v2beta1.Documents';

    /**
     * The default address of the service.
     */
    const SERVICE_ADDRESS = 'dialogflow.googleapis.com';

    /**
     * The default port of the service.
     */
    const DEFAULT_SERVICE_PORT = 443;

    /**
     * The name of the code generator, to be included in the agent header.
     */
    const CODEGEN_NAME = 'gapic';

    /**
     * The default scopes required by the service.
     */
    public static $serviceScopes = [
        'https://www.googleapis.com/auth/cloud-platform',
    ];
    private static $knowledgeBaseNameTemplate;
    private static $documentNameTemplate;
    private static $pathTemplateMap;

    private $operationsClient;

    private static function getClientDefaults()
    {
        return [
            'serviceName' => self::SERVICE_NAME,
            'serviceAddress' => self::SERVICE_ADDRESS.':'.self::DEFAULT_SERVICE_PORT,
            'clientConfig' => __DIR__.'/../resources/documents_client_config.json',
            'descriptorsConfigPath' => __DIR__.'/../resources/documents_descriptor_config.php',
            'gcpApiConfigPath' => __DIR__.'/../resources/documents_grpc_config.json',
            'credentialsConfig' => [
                'scopes' => self::$serviceScopes,
            ],
            'transportConfig' => [
                'rest' => [
                    'restClientConfigPath' => __DIR__.'/../resources/documents_rest_client_config.php',
                ],
            ],
        ];
    }

    private static function getKnowledgeBaseNameTemplate()
    {
        if (null == self::$knowledgeBaseNameTemplate) {
            self::$knowledgeBaseNameTemplate = new PathTemplate('projects/{project}/knowledgeBases/{knowledge_base}');
        }

        return self::$knowledgeBaseNameTemplate;
    }

    private static function getDocumentNameTemplate()
    {
        if (null == self::$documentNameTemplate) {
            self::$documentNameTemplate = new PathTemplate('projects/{project}/knowledgeBases/{knowledge_base}/documents/{document}');
        }

        return self::$documentNameTemplate;
    }

    private static function getPathTemplateMap()
    {
        if (null == self::$pathTemplateMap) {
            self::$pathTemplateMap = [
                'knowledgeBase' => self::getKnowledgeBaseNameTemplate(),
                'document' => self::getDocumentNameTemplate(),
            ];
        }

        return self::$pathTemplateMap;
    }

    /**
     * Formats a string containing the fully-qualified path to represent
     * a knowledge_base resource.
     *
     * @param string $project
     * @param string $knowledgeBase
     *
     * @return string The formatted knowledge_base resource.
     * @experimental
     */
    public static function knowledgeBaseName($project, $knowledgeBase)
    {
        return self::getKnowledgeBaseNameTemplate()->render([
            'project' => $project,
            'knowledge_base' => $knowledgeBase,
        ]);
    }

    /**
     * Formats a string containing the fully-qualified path to represent
     * a document resource.
     *
     * @param string $project
     * @param string $knowledgeBase
     * @param string $document
     *
     * @return string The formatted document resource.
     * @experimental
     */
    public static function documentName($project, $knowledgeBase, $document)
    {
        return self::getDocumentNameTemplate()->render([
            'project' => $project,
            'knowledge_base' => $knowledgeBase,
            'document' => $document,
        ]);
    }

    /**
     * Parses a formatted name string and returns an associative array of the components in the name.
     * The following name formats are supported:
     * Template: Pattern
     * - knowledgeBase: projects/{project}/knowledgeBases/{knowledge_base}
     * - document: projects/{project}/knowledgeBases/{knowledge_base}/documents/{document}.
     *
     * The optional $template argument can be supplied to specify a particular pattern, and must
     * match one of the templates listed above. If no $template argument is provided, or if the
     * $template argument does not match one of the templates listed, then parseName will check
     * each of the supported templates, and return the first match.
     *
     * @param string $formattedName The formatted name string
     * @param string $template      Optional name of template to match
     *
     * @return array An associative array from name component IDs to component values.
     *
     * @throws ValidationException If $formattedName could not be matched.
     * @experimental
     */
    public static function parseName($formattedName, $template = null)
    {
        $templateMap = self::getPathTemplateMap();

        if ($template) {
            if (!isset($templateMap[$template])) {
                throw new ValidationException("Template name $template does not exist");
            }

            return $templateMap[$template]->match($formattedName);
        }

        foreach ($templateMap as $templateName => $pathTemplate) {
            try {
                return $pathTemplate->match($formattedName);
            } catch (ValidationException $ex) {
                // Swallow the exception to continue trying other path templates
            }
        }
        throw new ValidationException("Input did not match any known format. Input: $formattedName");
    }

    /**
     * Return an OperationsClient object with the same endpoint as $this.
     *
     * @return OperationsClient
     * @experimental
     */
    public function getOperationsClient()
    {
        return $this->operationsClient;
    }

    /**
     * Resume an existing long running operation that was previously started
     * by a long running API method. If $methodName is not provided, or does
     * not match a long running API method, then the operation can still be
     * resumed, but the OperationResponse object will not deserialize the
     * final response.
     *
     * @param string $operationName The name of the long running operation
     * @param string $methodName    The name of the method used to start the operation
     *
     * @return OperationResponse
     * @experimental
     */
    public function resumeOperation($operationName, $methodName = null)
    {
        $options = isset($this->descriptors[$methodName]['longRunning'])
            ? $this->descriptors[$methodName]['longRunning']
            : [];
        $operation = new OperationResponse($operationName, $this->getOperationsClient(), $options);
        $operation->reload();

        return $operation;
    }

    /**
     * Constructor.
     *
     * @param array $options {
     *                       Optional. Options for configuring the service API wrapper.
     *
     *     @type string $serviceAddress
     *           The address of the API remote host. May optionally include the port, formatted
     *           as "<uri>:<port>". Default 'dialogflow.googleapis.com:443'.
     *     @type string|array|FetchAuthTokenInterface|CredentialsWrapper $credentials
     *           The credentials to be used by the client to authorize API calls. This option
     *           accepts either a path to a credentials file, or a decoded credentials file as a
     *           PHP array.
     *           *Advanced usage*: In addition, this option can also accept a pre-constructed
     *           {@see \Google\Auth\FetchAuthTokenInterface} object or
     *           {@see \Google\ApiCore\CredentialsWrapper} object. Note that when one of these
     *           objects are provided, any settings in $credentialsConfig will be ignored.
     *     @type array $credentialsConfig
     *           Options used to configure credentials, including auth token caching, for the client.
     *           For a full list of supporting configuration options, see
     *           {@see \Google\ApiCore\CredentialsWrapper::build()}.
     *     @type bool $disableRetries
     *           Determines whether or not retries defined by the client configuration should be
     *           disabled. Defaults to `false`.
     *     @type string|array $clientConfig
     *           Client method configuration, including retry settings. This option can be either a
     *           path to a JSON file, or a PHP array containing the decoded JSON data.
     *           By default this settings points to the default client config file, which is provided
     *           in the resources folder.
     *     @type string|TransportInterface $transport
     *           The transport used for executing network requests. May be either the string `rest`
     *           or `grpc`. Defaults to `grpc` if gRPC support is detected on the system.
     *           *Advanced usage*: Additionally, it is possible to pass in an already instantiated
     *           {@see \Google\ApiCore\Transport\TransportInterface} object. Note that when this
     *           object is provided, any settings in $transportConfig, and any $serviceAddress
     *           setting, will be ignored.
     *     @type array $transportConfig
     *           Configuration options that will be used to construct the transport. Options for
     *           each supported transport type should be passed in a key for that transport. For
     *           example:
     *           $transportConfig = [
     *               'grpc' => [...],
     *               'rest' => [...]
     *           ];
     *           See the {@see \Google\ApiCore\Transport\GrpcTransport::build()} and
     *           {@see \Google\ApiCore\Transport\RestTransport::build()} methods for the
     *           supported options.
     * }
     *
     * @throws ValidationException
     * @experimental
     */
    public function __construct(array $options = [])
    {
        $clientOptions = $this->buildClientOptions($options);
        $this->setClientOptions($clientOptions);
        $this->operationsClient = $this->createOperationsClient($clientOptions);
    }

    /**
     * Returns the list of all documents of the knowledge base.
     *
     * Sample code:
     * ```
     * $documentsClient = new DocumentsClient();
     * try {
     *     $formattedParent = $documentsClient->knowledgeBaseName('[PROJECT]', '[KNOWLEDGE_BASE]');
     *     // Iterate over pages of elements
     *     $pagedResponse = $documentsClient->listDocuments($formattedParent);
     *     foreach ($pagedResponse->iteratePages() as $page) {
     *         foreach ($page as $element) {
     *             // doSomethingWith($element);
     *         }
     *     }
     *
     *
     *     // Alternatively:
     *
     *     // Iterate through all elements
     *     $pagedResponse = $documentsClient->listDocuments($formattedParent);
     *     foreach ($pagedResponse->iterateAllElements() as $element) {
     *         // doSomethingWith($element);
     *     }
     * } finally {
     *     $documentsClient->close();
     * }
     * ```
     *
     * @param string $parent       Required. The knowledge base to list all documents for.
     *                             Format: `projects/<Project ID>/knowledgeBases/<Knowledge Base ID>`.
     * @param array  $optionalArgs {
     *                             Optional.
     *
     *     @type int $pageSize
     *          The maximum number of resources contained in the underlying API
     *          response. The API may return fewer values in a page, even if
     *          there are additional values to be retrieved.
     *     @type string $pageToken
     *          A page token is used to specify a page of values to be returned.
     *          If no page token is specified (the default), the first page
     *          of values will be returned. Any page token used here must have
     *          been generated by a previous call to the API.
     *     @type RetrySettings|array $retrySettings
     *          Retry settings to use for this call. Can be a
     *          {@see Google\ApiCore\RetrySettings} object, or an associative array
     *          of retry settings parameters. See the documentation on
     *          {@see Google\ApiCore\RetrySettings} for example usage.
     * }
     *
     * @return \Google\ApiCore\PagedListResponse
     *
     * @throws ApiException if the remote call fails
     * @experimental
     */
    public function listDocuments($parent, array $optionalArgs = [])
    {
        $request = new ListDocumentsRequest();
        $request->setParent($parent);
        if (isset($optionalArgs['pageSize'])) {
            $request->setPageSize($optionalArgs['pageSize']);
        }
        if (isset($optionalArgs['pageToken'])) {
            $request->setPageToken($optionalArgs['pageToken']);
        }

        return $this->getPagedListResponse(
            'ListDocuments',
            $optionalArgs,
            ListDocumentsResponse::class,
            $request
        );
    }

    /**
     * Retrieves the specified document.
     *
     * Sample code:
     * ```
     * $documentsClient = new DocumentsClient();
     * try {
     *     $formattedName = $documentsClient->documentName('[PROJECT]', '[KNOWLEDGE_BASE]', '[DOCUMENT]');
     *     $response = $documentsClient->getDocument($formattedName);
     * } finally {
     *     $documentsClient->close();
     * }
     * ```
     *
     * @param string $name         Required. The name of the document to retrieve.
     *                             Format `projects/<Project ID>/knowledgeBases/<Knowledge Base
     *                             ID>/documents/<Document ID>`.
     * @param array  $optionalArgs {
     *                             Optional.
     *
     *     @type RetrySettings|array $retrySettings
     *          Retry settings to use for this call. Can be a
     *          {@see Google\ApiCore\RetrySettings} object, or an associative array
     *          of retry settings parameters. See the documentation on
     *          {@see Google\ApiCore\RetrySettings} for example usage.
     * }
     *
     * @return \Google\Cloud\Dialogflow\V2beta1\Document
     *
     * @throws ApiException if the remote call fails
     * @experimental
     */
    public function getDocument($name, array $optionalArgs = [])
    {
        $request = new GetDocumentRequest();
        $request->setName($name);

        return $this->startCall(
            'GetDocument',
            Document::class,
            $optionalArgs,
            $request
        )->wait();
    }

    /**
     * Creates a new document.
     *
     * Operation <response: [Document][google.cloud.dialogflow.v2beta1.Document],
     *            metadata: [KnowledgeOperationMetadata][google.cloud.dialogflow.v2beta1.KnowledgeOperationMetadata]>
     *
     * Sample code:
     * ```
     * $documentsClient = new DocumentsClient();
     * try {
     *     $formattedParent = $documentsClient->knowledgeBaseName('[PROJECT]', '[KNOWLEDGE_BASE]');
     *     $document = new Document();
     *     $operationResponse = $documentsClient->createDocument($formattedParent, $document);
     *     $operationResponse->pollUntilComplete();
     *     if ($operationResponse->operationSucceeded()) {
     *         $result = $operationResponse->getResult();
     *         // doSomethingWith($result)
     *     } else {
     *         $error = $operationResponse->getError();
     *         // handleError($error)
     *     }
     *
     *
     *     // Alternatively:
     *
     *     // start the operation, keep the operation name, and resume later
     *     $operationResponse = $documentsClient->createDocument($formattedParent, $document);
     *     $operationName = $operationResponse->getName();
     *     // ... do other work
     *     $newOperationResponse = $documentsClient->resumeOperation($operationName, 'createDocument');
     *     while (!$newOperationResponse->isDone()) {
     *         // ... do other work
     *         $newOperationResponse->reload();
     *     }
     *     if ($newOperationResponse->operationSucceeded()) {
     *       $result = $newOperationResponse->getResult();
     *       // doSomethingWith($result)
     *     } else {
     *       $error = $newOperationResponse->getError();
     *       // handleError($error)
     *     }
     * } finally {
     *     $documentsClient->close();
     * }
     * ```
     *
     * @param string   $parent       Required. The knoweldge base to create a document for.
     *                               Format: `projects/<Project ID>/knowledgeBases/<Knowledge Base ID>`.
     * @param Document $document     Required. The document to create.
     * @param array    $optionalArgs {
     *                               Optional.
     *
     *     @type RetrySettings|array $retrySettings
     *          Retry settings to use for this call. Can be a
     *          {@see Google\ApiCore\RetrySettings} object, or an associative array
     *          of retry settings parameters. See the documentation on
     *          {@see Google\ApiCore\RetrySettings} for example usage.
     * }
     *
     * @return \Google\ApiCore\OperationResponse
     *
     * @throws ApiException if the remote call fails
     * @experimental
     */
    public function createDocument($parent, $document, array $optionalArgs = [])
    {
        $request = new CreateDocumentRequest();
        $request->setParent($parent);
        $request->setDocument($document);

        return $this->startOperationsCall(
            'CreateDocument',
            $optionalArgs,
            $request,
            $this->getOperationsClient()
        )->wait();
    }

    /**
     * Deletes the specified document.
     *
     * Operation <response: [google.protobuf.Empty][google.protobuf.Empty],
     *            metadata: [KnowledgeOperationMetadata][google.cloud.dialogflow.v2beta1.KnowledgeOperationMetadata]>
     *
     * Sample code:
     * ```
     * $documentsClient = new DocumentsClient();
     * try {
     *     $formattedName = $documentsClient->documentName('[PROJECT]', '[KNOWLEDGE_BASE]', '[DOCUMENT]');
     *     $operationResponse = $documentsClient->deleteDocument($formattedName);
     *     $operationResponse->pollUntilComplete();
     *     if ($operationResponse->operationSucceeded()) {
     *         // operation succeeded and returns no value
     *     } else {
     *         $error = $operationResponse->getError();
     *         // handleError($error)
     *     }
     *
     *
     *     // Alternatively:
     *
     *     // start the operation, keep the operation name, and resume later
     *     $operationResponse = $documentsClient->deleteDocument($formattedName);
     *     $operationName = $operationResponse->getName();
     *     // ... do other work
     *     $newOperationResponse = $documentsClient->resumeOperation($operationName, 'deleteDocument');
     *     while (!$newOperationResponse->isDone()) {
     *         // ... do other work
     *         $newOperationResponse->reload();
     *     }
     *     if ($newOperationResponse->operationSucceeded()) {
     *       // operation succeeded and returns no value
     *     } else {
     *       $error = $newOperationResponse->getError();
     *       // handleError($error)
     *     }
     * } finally {
     *     $documentsClient->close();
     * }
     * ```
     *
     * @param string $name         The name of the document to delete.
     *                             Format: `projects/<Project ID>/knowledgeBases/<Knowledge Base
     *                             ID>/documents/<Document ID>`.
     * @param array  $optionalArgs {
     *                             Optional.
     *
     *     @type RetrySettings|array $retrySettings
     *          Retry settings to use for this call. Can be a
     *          {@see Google\ApiCore\RetrySettings} object, or an associative array
     *          of retry settings parameters. See the documentation on
     *          {@see Google\ApiCore\RetrySettings} for example usage.
     * }
     *
     * @return \Google\ApiCore\OperationResponse
     *
     * @throws ApiException if the remote call fails
     * @experimental
     */
    public function deleteDocument($name, array $optionalArgs = [])
    {
        $request = new DeleteDocumentRequest();
        $request->setName($name);

        return $this->startOperationsCall(
            'DeleteDocument',
            $optionalArgs,
            $request,
            $this->getOperationsClient()
        )->wait();
    }
}
