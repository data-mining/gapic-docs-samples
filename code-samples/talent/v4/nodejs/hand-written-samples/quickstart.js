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

// [START quickstart]

const createAuthoredClientOpts = require('./create-authored-client-opts');
const talent = require('talent');

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT;

// Lists companies
(async () => {
  try {
    // Create an authorized company service client
    const authoredClientOpts = await createAuthoredClientOpts();
    const companyServiceClient = new talent.v4beta1.CompanyServiceClient(
      authoredClientOpts
    );

    const request = {
      parent: companyServiceClient.projectPath(PROJECT_ID),
    };

    const companies = await companyServiceClient.listCompanies(request);
    console.log('result is:' + JSON.stringify(companies[0][0]));
  } catch (e) {
    console.error(e);
    throw e;
  }
})();
// [END quickstart]
