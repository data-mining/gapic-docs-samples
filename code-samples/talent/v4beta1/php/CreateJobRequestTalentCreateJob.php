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
 * DO NOT EDIT! This is a generated sample ("Request",  "talent_create_job")
 */

// [START talent_create_job]
require __DIR__ . '/vendor/autoload.php';

use Google\Cloud\Talent\V4beta1\JobServiceClient;
use Google\Cloud\Talent\V4beta1\Job;
use Google\Cloud\Talent\V4beta1\Job_ApplicationInfo;

function sampleCreateJob($projectId, $companyName, $requisitionId, $title, $description, $jobApplicationUrl, $addressOne, $addressTwo, $languageCode)
{
    // [START talent_create_job_core]

    $jobServiceClient = new JobServiceClient();

    // $projectId = 'Your Google Cloud Project ID';
    // $companyName = 'Company name, e.g. projects/your-project/companies/company-id';
    // $requisitionId = 'Job requisition ID, aka Posting ID. Unique per job.';
    // $title = 'Software Engineer';
    // $description = 'This is a description of this <i>wonderful</i> job!';
    // $jobApplicationUrl = 'https://www.example.org/job-posting/123';
    // $addressOne = '1600 Amphitheatre Parkway, Mountain View, CA 94043';
    // $addressTwo = '111 8th Avenue, New York, NY 10011';
    // $languageCode = 'en-US';
    $formattedParent = $jobServiceClient->projectName($projectId);
    $uris = [$jobApplicationUrl];
    $applicationInfo = new Job_ApplicationInfo();
    $applicationInfo->setUris($uris);
    $addresses = [$addressOne, $addressTwo];
    $job = new Job();
    $job->setCompanyName($companyName);
    $job->setRequisitionId($requisitionId);
    $job->setTitle($title);
    $job->setDescription($description);
    $job->setApplicationInfo($applicationInfo);
    $job->setAddresses($addresses);
    $job->setLanguageCode($languageCode);

    try {
        $response = $jobServiceClient->createJob($formattedParent, $job);
        printf('Created job: %s'.PHP_EOL, $response->getName());
    } finally {
        $jobServiceClient->close();
    }

    // [END talent_create_job_core]
}
// [END talent_create_job]

$opts = [
    'project_id::',
    'company_name::',
    'requisition_id::',
    'title::',
    'description::',
    'job_application_url::',
    'address_one::',
    'address_two::',
    'language_code::',
];

$defaultOptions = [
    'project_id' => 'Your Google Cloud Project ID',
    'company_name' => 'Company name, e.g. projects/your-project/companies/company-id',
    'requisition_id' => 'Job requisition ID, aka Posting ID. Unique per job.',
    'title' => 'Software Engineer',
    'description' => 'This is a description of this <i>wonderful</i> job!',
    'job_application_url' => 'https://www.example.org/job-posting/123',
    'address_one' => '1600 Amphitheatre Parkway, Mountain View, CA 94043',
    'address_two' => '111 8th Avenue, New York, NY 10011',
    'language_code' => 'en-US',
];

$options = getopt('', $opts);
$options += $defaultOptions;

$projectId = $options['project_id'];
$companyName = $options['company_name'];
$requisitionId = $options['requisition_id'];
$title = $options['title'];
$description = $options['description'];
$jobApplicationUrl = $options['job_application_url'];
$addressOne = $options['address_one'];
$addressTwo = $options['address_two'];
$languageCode = $options['language_code'];

sampleCreateJob($projectId, $companyName, $requisitionId, $title, $description, $jobApplicationUrl, $addressOne, $addressTwo, $languageCode);
