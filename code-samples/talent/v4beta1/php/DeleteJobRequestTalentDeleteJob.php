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
 * DO NOT EDIT! This is a generated sample ("Request",  "talent_delete_job")
 */

// [START talent_delete_job]
require __DIR__ . '/vendor/autoload.php';

use Google\Cloud\Talent\V4beta1\JobServiceClient;

function sampleDeleteJob($projectId, $jobId)
{
    // [START talent_delete_job_core]

    $jobServiceClient = new JobServiceClient();

    // $projectId = 'Your Google Cloud Project ID';
    // $jobId = 'Company ID';
    $formattedName = $jobServiceClient->jobName($projectId, $jobId);

    try {
        $jobServiceClient->deleteJob($formattedName);
        printf('Deleted job.'.PHP_EOL);
    } finally {
        $jobServiceClient->close();
    }

    // [END talent_delete_job_core]
}
// [END talent_delete_job]

$opts = [
    'project_id::',
    'job_id::',
];

$defaultOptions = [
    'project_id' => 'Your Google Cloud Project ID',
    'job_id' => 'Company ID',
];

$options = getopt('', $opts);
$options += $defaultOptions;

$projectId = $options['project_id'];
$jobId = $options['job_id'];

sampleDeleteJob($projectId, $jobId);
