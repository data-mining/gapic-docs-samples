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
 * DO NOT EDIT! This is a generated sample ("Request",  "talent_delete_company")
 */

// [START talent_delete_company]
require __DIR__ . '/vendor/autoload.php';

use Google\Cloud\Talent\V4beta1\CompanyServiceClient;

function sampleDeleteCompany($projectIdChanged, $companyIdChanged)
{
    // [START talent_delete_company_core]

    $companyServiceClient = new CompanyServiceClient();

    // $projectIdChanged = 'Your Google Cloud Project ID CHANGED';
    // $companyIdChanged = 'ID of the company to delete';
    $formattedName = $companyServiceClient->companyName($projectIdChanged, $companyIdChanged);

    try {
        $companyServiceClient->deleteCompany($formattedName); // What is going on?
        printf('Hello???'.PHP_EOL);
        printf('Deleted company'.PHP_EOL);
    } finally {
        $companyServiceClient->close();
    }

    // [END talent_delete_company_core]
}
// [END talent_delete_company]

$opts = [
    'project_id_changed::',
    'company_id_changed::',
];

$defaultOptions = [
    'project_id_changed' => 'Your Google Cloud Project ID CHANGED',
    'company_id_changed' => 'ID of the company to delete',
];

$options = getopt('', $opts);
$options += $defaultOptions;

$projectIdChanged = $options['project_id_changed'];
$companyIdChanged = $options['company_id_changed'];

sampleDeleteCompany($projectIdChanged, $companyIdChanged);
