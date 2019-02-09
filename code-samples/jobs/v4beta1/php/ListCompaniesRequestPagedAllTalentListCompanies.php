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
 * DO NOT EDIT! This is a generated sample ("RequestPagedAll",  "talent_list_companies")
 */

// [START talent_list_companies]
require __DIR__ . '/vendor/autoload.php';

use Google\Cloud\Talent\V4beta1\CompanyServiceClient;

function sampleListCompanies($projectId)
{
    // [START talent_list_companies_core]

    $companyServiceClient = new CompanyServiceClient();

    // $projectId = 'Your Google Cloud Project ID';
    $formattedParent = $companyServiceClient->projectName($projectId);

    try {
        // Iterate through all elements
        $pagedResponse = $companyServiceClient->listCompanies($formattedParent);
        foreach ($pagedResponse->iterateAllElements() as $responseItem) {
            printf('Company: %s'.PHP_EOL, $responseItem->getName());
            printf('Display name: %s'.PHP_EOL, $responseItem->getDisplayName());
        }
    } finally {
        $companyServiceClient->close();
    }

    // [END talent_list_companies_core]
}
// [END talent_list_companies]

$opts = [
    'projectId::',
];

$defaultOptions = [
    'projectId' => 'Your Google Cloud Project ID',
];

$options = getopt('', $opts);
$options += $defaultOptions;

$projectId = $options['projectId'];

sampleListCompanies($projectId);
