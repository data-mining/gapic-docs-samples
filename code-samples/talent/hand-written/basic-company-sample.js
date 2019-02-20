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

const createAuthoredClientOpts = require('./create-authored-client-opts');
const talent = require('talent');

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT;

/**
 * This file contains the basic knowledge about company and job, including:
 *
 * - Construct a company with required fields
 *
 * - Create a company
 *
 * - Get a company
 *
 * - Update a company
 *
 * - Update a company with field mask
 *
 * - Delete a company
 */

// [START basic_company]

/**
 * Generate a company
 */
const generateCompany = () => {
  const displayName = 'Google';
  const external_id = `sample-company-${new Date().getTime()}`;
  const headquartersAddress =
    '1600 Amphitheatre Parkway Mountain View, CA 94043';

  const company = {
    displayName: displayName,
    externalId: external_id,
    headquartersAddress: headquartersAddress,
  };

  console.log(`Company generated: ${JSON.stringify(company)}`);
  return company;
};
// [END basic_company]

// [START create_company]

/**
 * Create a company.
 */
const createCompany = async (companyServiceClient, companyToBeCreated) => {
  try {
    const request = {
      parent: companyServiceClient.projectPath(PROJECT_ID),
      company: companyToBeCreated,
    };

    const companyCreated = await companyServiceClient.createCompany(request);

    console.log(`Company created: ${JSON.stringify(companyCreated)}`);
    return companyCreated[0];
  } catch (e) {
    console.error(`Failed to create company! ${e}`);
    throw e;
  }
};
// [END create_company]

// [START get_company]

/**
 * Get a company.
 */
const getCompany = async (companyServiceClient, companyName) => {
  try {
    const request = {
      name: companyName,
    };

    const companyExisted = await companyServiceClient.getCompany(request);

    console.log(`Company existed: ${JSON.stringify(companyExisted[0])}`);
    return companyExisted[0];
  } catch (e) {
    console.error('Got exception while getting company');
    throw e;
  }
};
// [END get_company]

// [START update_company]

/**
 * Updates a company.
 */
const updateCompany = async (companyServiceClient, companyToBeUpdated) => {
  try {
    const request = {
      company: companyToBeUpdated,
    };

    const companyUpdated = await companyServiceClient.updateCompany(request);

    console.log(`Company updated: ${JSON.stringify(companyUpdated[0])}`);
    return companyUpdated[0];
  } catch (e) {
    console.error(`Got exception while updating company! ${e}`);
    throw e;
  }
};
// [END update_company]

// [START update_company_with_field_mask]

/**
 * Updates a company with field mask.
 */
const updateCompanyWithFieldMask = async (
  companyServiceClient,
  companyToBeUpdated,
  fieldMask
) => {
  try {
    const request = {
      company: companyToBeUpdated,
      updateMask: {fieldMask},
    };

    const companyUpdated = await companyServiceClient.updateCompany(request);

    console.log(
      `Company updated with filed mask: ${JSON.stringify(companyUpdated[0])}`
    );
    return companyUpdated.data;
  } catch (e) {
    console.error(`Got exception while updating company with field mask! ${e}`);
    throw e;
  }
};
// [END update_company_with_field_mask]

// [START delete_company]

/**
 * Delete a company.
 */
const deleteCompany = async (companyServiceClient, companyName) => {
  try {
    const request = {
      name: companyName,
    };

    await companyServiceClient.deleteCompany(request);
    console.log('Company deleted');
  } catch (e) {
    console.error('Got exception while deleting company');
    throw e;
  }
};
// [END delete_company]

// Run Sample
const runSample = async () => {
  try {
    // Create an authorized company service client
    const authoredClientOpts = await createAuthoredClientOpts();
    const companyServiceClient = new talent.v4beta1.CompanyServiceClient(
      authoredClientOpts
    );

    // Construct a company
    const companyToBeCreated = generateCompany();

    // Create a company
    const companyCreated = await createCompany(
      companyServiceClient,
      companyToBeCreated
    );

    // Get a company
    const companyName = companyCreated.name;
    await getCompany(companyServiceClient, companyName);

    // Update a company
    let companyToBeUpdated = companyCreated;
    companyToBeUpdated.websiteUri = 'https://elgoog.im/';

    await updateCompany(companyServiceClient, companyToBeUpdated);

    // Update a company with field mask
    companyToBeUpdated.displayName = 'changedTitle';
    companyToBeUpdated.externalId = companyCreated.externalId;
    const fieldMask = 'displayName';

    await updateCompanyWithFieldMask(
      companyServiceClient,
      companyToBeUpdated,
      fieldMask
    );
    //
    // Delete a company
    await deleteCompany(companyServiceClient, companyName);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = {
  generateCompany: generateCompany,
  createCompany: createCompany,
  deleteCompany: deleteCompany,
  runSample: runSample,
};
