# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
import grpc

from google.cloud.talent_v4beta1.proto import resume_service_pb2 as google_dot_cloud_dot_talent__v4beta1_dot_proto_dot_resume__service__pb2


class ResumeServiceStub(object):
  """A service that handles resume parsing.
  """

  def __init__(self, channel):
    """Constructor.

    Args:
      channel: A grpc.Channel.
    """
    self.ParseResume = channel.unary_unary(
        '/google.cloud.talent.v4beta1.ResumeService/ParseResume',
        request_serializer=google_dot_cloud_dot_talent__v4beta1_dot_proto_dot_resume__service__pb2.ParseResumeRequest.SerializeToString,
        response_deserializer=google_dot_cloud_dot_talent__v4beta1_dot_proto_dot_resume__service__pb2.ParseResumeResponse.FromString,
        )


class ResumeServiceServicer(object):
  """A service that handles resume parsing.
  """

  def ParseResume(self, request, context):
    """Parses a resume into a [Profile][google.cloud.talent.v4beta1.Profile]. The API attempts to fill out the
    following profile fields if present within the resume:

    * personNames
    * addresses
    * emailAddress
    * phoneNumbers
    * personalUris
    * employmentRecords
    * educationRecords
    * skills

    Note that some attributes in these fields may not be populated if they're
    not present within the resume or unrecognizable by the resume parser.

    This API does not save the resume or profile. To create a profile from this
    resume, clients need to call the CreateProfile method again with the
    profile returned.

    This API supports the following list of formats:

    * PDF
    * TXT
    * DOC
    * RTF
    * DOCX

    An error is thrown if the input format is not supported.
    """
    context.set_code(grpc.StatusCode.UNIMPLEMENTED)
    context.set_details('Method not implemented!')
    raise NotImplementedError('Method not implemented!')


def add_ResumeServiceServicer_to_server(servicer, server):
  rpc_method_handlers = {
      'ParseResume': grpc.unary_unary_rpc_method_handler(
          servicer.ParseResume,
          request_deserializer=google_dot_cloud_dot_talent__v4beta1_dot_proto_dot_resume__service__pb2.ParseResumeRequest.FromString,
          response_serializer=google_dot_cloud_dot_talent__v4beta1_dot_proto_dot_resume__service__pb2.ParseResumeResponse.SerializeToString,
      ),
  }
  generic_handler = grpc.method_handlers_generic_handler(
      'google.cloud.talent.v4beta1.ResumeService', rpc_method_handlers)
  server.add_generic_rpc_handlers((generic_handler,))