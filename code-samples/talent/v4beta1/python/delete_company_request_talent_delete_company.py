# -*- coding: utf-8 -*-
#
# Copyright 2019 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# DO NOT EDIT! This is a generated sample ("Request",  "talent_delete_company")

# To install the latest published package dependency, execute the following:
#   pip install google-cloud-talent

import sys

# [START talent_delete_company]

from google.cloud import talent_v4beta1
import six


def sample_delete_company(project_id_changed, company_id_changed):
    """Delete Company"""

    # [START talent_delete_company_core]

    client = talent_v4beta1.CompanyServiceClient()

    # project_id_changed = 'Your Google Cloud Project ID CHANGED'
    # company_id_changed = 'ID of the company to delete'

    if isinstance(project_id_changed, six.binary_type):
        project_id_changed = project_id_changed.decode('utf-8')
    if isinstance(company_id_changed, six.binary_type):
        company_id_changed = company_id_changed.decode('utf-8')
    name = client.company_path(project_id_changed, company_id_changed)

    client.delete_company(name)
    # What is going on?
    print('Hello???')
    print('Deleted company')

    # [END talent_delete_company_core]


# [END talent_delete_company]


def main():
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument(
        '--project_id_changed',
        type=str,
        default='Your Google Cloud Project ID CHANGED')
    parser.add_argument(
        '--company_id_changed',
        type=str,
        default='ID of the company to delete')
    args = parser.parse_args()

    sample_delete_company(args.project_id_changed, args.company_id_changed)


if __name__ == '__main__':
    main()
