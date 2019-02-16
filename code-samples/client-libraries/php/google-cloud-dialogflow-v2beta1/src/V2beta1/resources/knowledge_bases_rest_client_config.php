<?php

return [
    'interfaces' => [
        'google.cloud.dialogflow.v2beta1.KnowledgeBases' => [
            'ListKnowledgeBases' => [
                'method' => 'get',
                'uriTemplate' => '/v2beta1/{parent=projects/*}/knowledgeBases',
                'additionalBindings' => [
                    [
                        'method' => 'get',
                        'uriTemplate' => '/v2beta1/{parent=projects/*/agent}/knowledgeBases',
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
            'GetKnowledgeBase' => [
                'method' => 'get',
                'uriTemplate' => '/v2beta1/{name=projects/*/knowledgeBases/*}',
                'additionalBindings' => [
                    [
                        'method' => 'get',
                        'uriTemplate' => '/v2beta1/{name=projects/*/agent/knowledgeBases/*}',
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
            'CreateKnowledgeBase' => [
                'method' => 'post',
                'uriTemplate' => '/v2beta1/{parent=projects/*}/knowledgeBases',
                'body' => 'knowledge_base',
                'additionalBindings' => [
                    [
                        'method' => 'post',
                        'uriTemplate' => '/v2beta1/{parent=projects/*/agent}/knowledgeBases',
                        'body' => 'knowledge_base',
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
            'DeleteKnowledgeBase' => [
                'method' => 'delete',
                'uriTemplate' => '/v2beta1/{name=projects/*/knowledgeBases/*}',
                'additionalBindings' => [
                    [
                        'method' => 'delete',
                        'uriTemplate' => '/v2beta1/{name=projects/*/agent/knowledgeBases/*}',
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
