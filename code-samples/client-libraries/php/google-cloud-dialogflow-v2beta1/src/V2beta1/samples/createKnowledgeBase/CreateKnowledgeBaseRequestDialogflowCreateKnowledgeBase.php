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
 * DO NOT EDIT! This is a generated sample ("Request",  "dialogflow_create_knowledge_base")
 */

// [START dialogflow_create_knowledge_base]
require __DIR__.'/../../../../vendor/autoload.php';

use Google\Cloud\Dialogflow\V2beta1\KnowledgeBasesClient;
use Google\Cloud\Dialogflow\V2beta1\KnowledgeBase;

function sampleCreateKnowledgeBase($projectId, $displayName)
{
    // [START dialogflow_create_knowledge_base_core]

    $knowledgeBasesClient = new KnowledgeBasesClient();

    // $projectId = 'Your Google Cloud Project ID';
    // $displayName = 'KnowledgeBase display name';
    $formattedParent = $knowledgeBasesClient->projectName($projectId);
    $knowledgeBase = new KnowledgeBase();
    $knowledgeBase->setDisplayName($displayName);

    try {
        $response = $knowledgeBasesClient->createKnowledgeBase($formattedParent, $knowledgeBase);
        printf('Created Knowledge Base'.PHP_EOL);
        printf('Name: %s'.PHP_EOL, $response->getName());
        printf('Display Name: %s'.PHP_EOL, $response->getDisplayName());
    } finally {
        $knowledgeBasesClient->close();
    }

    // [END dialogflow_create_knowledge_base_core]
}
// [END dialogflow_create_knowledge_base]

$opts = [
    'project_id::',
    'display_name::',
];

$defaultOptions = [
    'project_id' => 'Your Google Cloud Project ID',
    'display_name' => 'KnowledgeBase display name',
];

$options = getopt('', $opts);
$options += $defaultOptions;

$projectId = $options['project_id'];
$displayName = $options['display_name'];

sampleCreateKnowledgeBase($projectId, $displayName);
