<?php

return [
    'interfaces' => [
        'google.cloud.dialogflow.v2beta1.Documents' => [
            'ListDocuments' => [
                'method' => 'get',
                'uriTemplate' => '/v2beta1/{parent=projects/*/knowledgeBases/*}/documents',
                'additionalBindings' => [
                    [
                        'method' => 'get',
                        'uriTemplate' => '/v2beta1/{parent=projects/*/agent/knowledgeBases/*}/documents',
                    ],
                ],
                'placeholders' => [
                    'parent' => [
                        'getters' => [
                            'getParent',
                        ],
                    ],
                ],
            ],
            'GetDocument' => [
                'method' => 'get',
                'uriTemplate' => '/v2beta1/{name=projects/*/knowledgeBases/*/documents/*}',
                'additionalBindings' => [
                    [
                        'method' => 'get',
                        'uriTemplate' => '/v2beta1/{name=projects/*/agent/knowledgeBases/*/documents/*}',
                    ],
                ],
                'placeholders' => [
                    'name' => [
                        'getters' => [
                            'getName',
                        ],
                    ],
                ],
            ],
            'CreateDocument' => [
                'method' => 'post',
                'uriTemplate' => '/v2beta1/{parent=projects/*/knowledgeBases/*}/documents',
                'body' => 'document',
                'additionalBindings' => [
                    [
                        'method' => 'post',
                        'uriTemplate' => '/v2beta1/{parent=projects/*/agent/knowledgeBases/*}/documents',
                        'body' => 'document',
                    ],
                ],
                'placeholders' => [
                    'parent' => [
                        'getters' => [
                            'getParent',
                        ],
                    ],
                ],
            ],
            'DeleteDocument' => [
                'method' => 'delete',
                'uriTemplate' => '/v2beta1/{name=projects/*/knowledgeBases/*/documents/*}',
                'additionalBindings' => [
                    [
                        'method' => 'delete',
                        'uriTemplate' => '/v2beta1/{name=projects/*/agent/knowledgeBases/*/documents/*}',
                    ],
                ],
                'placeholders' => [
                    'name' => [
                        'getters' => [
                            'getName',
                        ],
                    ],
                ],
            ],
        ],
        'google.longrunning.Operations' => [
            'GetOperation' => [
                'method' => 'get',
                'uriTemplate' => '/v2beta1/{name=projects/*/operations/*}',
                'additionalBindings' => [
                    [
                        'method' => 'get',
                        'uriTemplate' => '/v2/{name=projects/*/operations/*}',
                    ],
                ],
                'placeholders' => [
                    'name' => [
                        'getters' => [
                            'getName',
                        ],
                    ],
                ],
            ],
        ],
    ],
];
