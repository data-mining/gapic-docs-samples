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
 * DO NOT EDIT! This is a generated sample ("Request",  "talent_create_company")
 */

// [START talent_create_company]
require __DIR__ . '/vendor/autoload.php';

use Google\Cloud\Talent\V4beta1\CompanyServiceClient;
use Google\Cloud\Talent\V4beta1\Company;

function sampleCreateCompany($projectId, $displayName)
{
    // [START talent_create_company_core]

    $companyServiceClient = new CompanyServiceClient();

    // $projectId = 'Your Google Cloud Project ID';
    // $displayName = 'My Company Name';
    $formattedParent = $companyServiceClient->projectName($projectId);
    $externalId = 'Identifier of this company in my system';
    $company = new Company();
    $company->setDisplayName($displayName);
    $company->setExternalId($externalId);

    try {
        $response = $companyServiceClient->createCompany($formattedParent, $company);
        printf('Created company: %s'.PHP_EOL, $response->getDisplayName());
        printf('Company name: %s'.PHP_EOL, $response->getName());
    } finally {
        $companyServiceClient->close();
    }

    // [END talent_create_company_core]
}
// [END talent_create_company]

$opts = [
    'project_id::',
    'display_name::',
];

$defaultOptions = [
    'project_id' => 'Your Google Cloud Project ID',
    'display_name' => 'My Company Name',
];

$options = getopt('', $opts);
$options += $defaultOptions;

$projectId = $options['project_id'];
$displayName = $options['display_name'];

sampleCreateCompany($projectId, $displayName);
