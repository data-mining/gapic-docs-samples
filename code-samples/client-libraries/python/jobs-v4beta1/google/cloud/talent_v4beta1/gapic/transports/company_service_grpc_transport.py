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

import google.api_core.grpc_helpers

from google.cloud.talent_v4beta1.proto import company_service_pb2_grpc


class CompanyServiceGrpcTransport(object):
    """gRPC transport class providing stubs for
    google.cloud.talent.v4beta1 CompanyService API.

    The transport provides access to the raw gRPC stubs,
    which can be used to take advantage of advanced
    features of gRPC.
    """
    # The scopes needed to make gRPC calls to all of the methods defined
    # in this service.
    _OAUTH_SCOPES = (
        'https://www.googleapis.com/auth/cloud-platform',
        'https://www.googleapis.com/auth/jobs',
    )

    def __init__(self,
                 channel=None,
                 credentials=None,
                 address='jobs.googleapis.com:443'):
        """Instantiate the transport class.

        Args:
            channel (grpc.Channel): A ``Channel`` instance through
                which to make calls. This argument is mutually exclusive
                with ``credentials``; providing both will raise an exception.
            credentials (google.auth.credentials.Credentials): The
                authorization credentials to attach to requests. These
                credentials identify this application to the service. If none
                are specified, the client will attempt to ascertain the
                credentials from the environment.
            address (str): The address where the service is hosted.
        """
        # If both `channel` and `credentials` are specified, raise an
        # exception (channels come with credentials baked in already).
        if channel is not None and credentials is not None:
            raise ValueError(
                'The `channel` and `credentials` arguments are mutually '
                'exclusive.', )

        # Create the channel.
        if channel is None:
            channel = self.create_channel(
                address=address,
                credentials=credentials,
            )

        self._channel = channel

        # gRPC uses objects called "stubs" that are bound to the
        # channel and provide a basic method for each RPC.
        self._stubs = {
            'company_service_stub':
            company_service_pb2_grpc.CompanyServiceStub(channel),
        }

    @classmethod
    def create_channel(cls,
                       address='jobs.googleapis.com:443',
                       credentials=None):
        """Create and return a gRPC channel object.

        Args:
            address (str): The host for the channel to use.
            credentials (~.Credentials): The
                authorization credentials to attach to requests. These
                credentials identify this application to the service. If
                none are specified, the client will attempt to ascertain
                the credentials from the environment.

        Returns:
            grpc.Channel: A gRPC channel object.
        """
        return google.api_core.grpc_helpers.create_channel(
            address,
            credentials=credentials,
            scopes=cls._OAUTH_SCOPES,
        )

    @property
    def channel(self):
        """The gRPC channel used by the transport.

        Returns:
            grpc.Channel: A gRPC channel object.
        """
        return self._channel

    @property
    def create_company(self):
        """Return the gRPC stub for :meth:`CompanyServiceClient.create_company`.

        Creates a new company entity.

        Returns:
            Callable: A callable which accepts the appropriate
                deserialized request object and returns a
                deserialized response object.
        """
        return self._stubs['company_service_stub'].CreateCompany

    @property
    def get_company(self):
        """Return the gRPC stub for :meth:`CompanyServiceClient.get_company`.

        Retrieves specified company.

        Returns:
            Callable: A callable which accepts the appropriate
                deserialized request object and returns a
                deserialized response object.
        """
        return self._stubs['company_service_stub'].GetCompany

    @property
    def update_company(self):
        """Return the gRPC stub for :meth:`CompanyServiceClient.update_company`.

        Updates specified company. Company names can't be updated. To update a
        company name, delete the company and all jobs associated with it, and only
        then re-create them.

        Returns:
            Callable: A callable which accepts the appropriate
                deserialized request object and returns a
                deserialized response object.
        """
        return self._stubs['company_service_stub'].UpdateCompany

    @property
    def delete_company(self):
        """Return the gRPC stub for :meth:`CompanyServiceClient.delete_company`.

        Deletes specified company.
        Prerequisite: The company has no jobs associated with it.

        Returns:
            Callable: A callable which accepts the appropriate
                deserialized request object and returns a
                deserialized response object.
        """
        return self._stubs['company_service_stub'].DeleteCompany

    @property
    def list_companies(self):
        """Return the gRPC stub for :meth:`CompanyServiceClient.list_companies`.

        Lists all companies associated with the service account.

        Returns:
            Callable: A callable which accepts the appropriate
                deserialized request object and returns a
                deserialized response object.
        """
        return self._stubs['company_service_stub'].ListCompanies
