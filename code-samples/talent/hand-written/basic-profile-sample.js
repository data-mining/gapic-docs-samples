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
const basicCompanySample = require(`./basic-company-sample`);
const createAuthoredClientOpts = require('./create-authored-client-opts');
const talent = require('talent');

/**
 * This file contains the basic knowledge about profile, including:
 *
 * - Construct a job with required fields
 *
 * - Create a profile
 *
 * - Get a profile
 *
 * - Search profile
 *
 * - Delete a profile
 */

// [START basic_profile]

/**
 * Generate a basic job with given companyName.
 */
const generateProfileWithRequiredFields = () => {
  const externalId = `profile-${new Date().getTime()}`;
  const employer = {
    employerName: 'Google',
    jobTitle: 'Software Engineer',
    address: {
      isCurrent: {value: true},
      structuredAddress: {
        locality: 'Mountain view',
        administrativeArea: 'CA',
      },
    },
  };
  const profile = {
    externalId: externalId,
    createTime: {seconds: new Date().getSeconds()},
    employmentRecords: [employer],
  };

  console.log(`Profile generated: ${JSON.stringify(profile)}`);
  return profile;
};
// [END basic_profile]

// [START create_profile]

/**
 * Create a Profile.
 */
const createProfile = async (
  profileServiceClient,
  companyName,
  profileToBeCreated
) => {
  try {
    const request = {
      parent: companyName,
      profile: profileToBeCreated,
    };

    const profileCreated = await profileServiceClient.createProfile(request);

    console.log(`Profile created: ${JSON.stringify(profileCreated[0])}`);
    return profileCreated[0];
  } catch (e) {
    console.error(`Got exception while creating profile!`);
    throw e;
  }
};
// [END create_profile]

// [START get_profile]

/**
 * Get a profile.
 */
const getProfile = async (profileServiceClient, profileName) => {
  try {
    const request = {
      name: profileName,
    };

    const profileExisted = await profileServiceClient.getProfile(request);

    console.log(`Profile existed: ${JSON.stringify(profileExisted[0])}`);
    return profileExisted[0];
  } catch (e) {
    console.error('Got exception while getting profile');
    throw e;
  }
};
// [END get_profile]

// [START search_profile]

/**
 * Get a profile.
 */
const searchProfile = async (profileServiceClient, companyName) => {
  try {
    const requestMetadata = {
      userId: 'HashedUserId',
      sessionId: 'HashedSessionId',
      domain: 'www.google.com',
    };

    const jobTitleFilters = [
      {jobTitle: 'Software Engineer'},
      {jobTitle: 'Java Developer'},
    ];
    const employerFilters = [{employer: 'Google'}];
    const educationFilter = [{fieldOfStudy: 'Computer Science'}];

    const request = {
      parent: companyName,
      requestMetadata: requestMetadata,
      profileQuery: {
        jobTitleFilters: jobTitleFilters,
        employerFilters: employerFilters,
        educationFilter: educationFilter,
      },
    };

    const result = await profileServiceClient.searchProfiles(request);

    console.log(`Profile search results are: ${JSON.stringify(result[0])}`);
  } catch (e) {
    console.error('Got exception while getting profile');
    throw e;
  }
};
// [END search_profile]

// [START delete_profile]

/**
 * Delete a job.
 */
const deleteProfile = async (profileServiceClient, profileName) => {
  try {
    const request = {
      name: profileName,
    };

    await profileServiceClient.deleteProfile(request);
    console.log('Profile deleted');
  } catch (e) {
    console.error('Got exception while deleting job');
    throw e;
  }
};
// [END delete_profile]

// Run Sample
(async () => {
  try {
    // Create an authorized company service client
    const authoredClientOpts = await createAuthoredClientOpts();
    const companyServiceClient = new talent.v4beta1.CompanyServiceClient(
      authoredClientOpts
    );
    const profileServiceClient = new talent.v4beta1.ProfileServiceClient(
      authoredClientOpts
    );

    // Create a company before creating jobs
    const companyToBeCreated = basicCompanySample.generateCompany();
    const companyCreated = await basicCompanySample.createCompany(
      companyServiceClient,
      companyToBeCreated
    );
    const companyName = companyCreated.name;

    // Construct a profile
    const profileToBeCreated = generateProfileWithRequiredFields();

    // Create a profile
    const profileCreated = await createProfile(
      profileServiceClient,
      companyName,
      profileToBeCreated
    );

    // Get profile
    const profileName = profileCreated.name;
    await getProfile(profileServiceClient, profileName);

    // Search profile
    await searchProfile(profileServiceClient, companyName);

    // Delete profile
    await deleteProfile(profileServiceClient, profileName);

    // Delete company only after cleaning all jobs under this company
    await basicCompanySample.deleteCompany(companyServiceClient, companyName);
  } catch (e) {
    console.log(e);
    throw e;
  }
})();
