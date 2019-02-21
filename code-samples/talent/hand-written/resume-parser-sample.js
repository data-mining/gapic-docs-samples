/**
 * Copyright 2018, Google, LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// [START resume_parser]

const createAuthoredClientOpts = require('./create-authored-client-opts');
const talent = require('talent');

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT;

// Lists companies
(async () => {
  try {
    // Create an authorized company service client
    const authoredClientOpts = await createAuthoredClientOpts();
    const resumeServiceClient = new talent.v4beta1.ResumeServiceClient(
      authoredClientOpts
    );

    const resume = Buffer.from('7468697320697320612074c3a97374', 'hex');
    const request = {
      parent: resumeServiceClient.projectPath(PROJECT_ID),
      resume: resume,
      regionCode: 'US',
      languageCode: 'en-US',
    };

    const result = await resumeServiceClient.parseResume(request);
    console.log('Resume parse result is:' + JSON.stringify(result[0]));
  } catch (e) {
    console.error(e);
    throw e;
  }
})();
// [END resume_parser]
