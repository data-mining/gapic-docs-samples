# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: google/cloud/talent_v4beta1/proto/resume_service.proto

import sys
_b=sys.version_info[0]<3 and (lambda x:x) or (lambda x:x.encode('latin1'))
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from google.api import annotations_pb2 as google_dot_api_dot_annotations__pb2
from google.cloud.talent_v4beta1.proto import profile_pb2 as google_dot_cloud_dot_talent__v4beta1_dot_proto_dot_profile__pb2


DESCRIPTOR = _descriptor.FileDescriptor(
  name='google/cloud/talent_v4beta1/proto/resume_service.proto',
  package='google.cloud.talent.v4beta1',
  syntax='proto3',
  serialized_options=_b('\n\037com.google.cloud.talent.v4beta1B\022ResumeServiceProtoP\001ZAgoogle.golang.org/genproto/googleapis/cloud/talent/v4beta1;talent\242\002\003CTS'),
  serialized_pb=_b('\n6google/cloud/talent_v4beta1/proto/resume_service.proto\x12\x1bgoogle.cloud.talent.v4beta1\x1a\x1cgoogle/api/annotations.proto\x1a/google/cloud/talent_v4beta1/proto/profile.proto\"`\n\x12ParseResumeRequest\x12\x0e\n\x06parent\x18\x01 \x01(\t\x12\x0e\n\x06resume\x18\x02 \x01(\x0c\x12\x13\n\x0bregion_code\x18\x03 \x01(\t\x12\x15\n\rlanguage_code\x18\x04 \x01(\t\"^\n\x13ParseResumeResponse\x12\x35\n\x07profile\x18\x01 \x01(\x0b\x32$.google.cloud.talent.v4beta1.Profile\x12\x10\n\x08raw_text\x18\x02 \x01(\t2\xb9\x01\n\rResumeService\x12\xa7\x01\n\x0bParseResume\x12/.google.cloud.talent.v4beta1.ParseResumeRequest\x1a\x30.google.cloud.talent.v4beta1.ParseResumeResponse\"5\x82\xd3\xe4\x93\x02/\"*/v4beta1/{parent=projects/*}/resumes:parse:\x01*B\x80\x01\n\x1f\x63om.google.cloud.talent.v4beta1B\x12ResumeServiceProtoP\x01ZAgoogle.golang.org/genproto/googleapis/cloud/talent/v4beta1;talent\xa2\x02\x03\x43TSb\x06proto3')
  ,
  dependencies=[google_dot_api_dot_annotations__pb2.DESCRIPTOR,google_dot_cloud_dot_talent__v4beta1_dot_proto_dot_profile__pb2.DESCRIPTOR,])




_PARSERESUMEREQUEST = _descriptor.Descriptor(
  name='ParseResumeRequest',
  full_name='google.cloud.talent.v4beta1.ParseResumeRequest',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='parent', full_name='google.cloud.talent.v4beta1.ParseResumeRequest.parent', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='resume', full_name='google.cloud.talent.v4beta1.ParseResumeRequest.resume', index=1,
      number=2, type=12, cpp_type=9, label=1,
      has_default_value=False, default_value=_b(""),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='region_code', full_name='google.cloud.talent.v4beta1.ParseResumeRequest.region_code', index=2,
      number=3, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='language_code', full_name='google.cloud.talent.v4beta1.ParseResumeRequest.language_code', index=3,
      number=4, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=166,
  serialized_end=262,
)


_PARSERESUMERESPONSE = _descriptor.Descriptor(
  name='ParseResumeResponse',
  full_name='google.cloud.talent.v4beta1.ParseResumeResponse',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='profile', full_name='google.cloud.talent.v4beta1.ParseResumeResponse.profile', index=0,
      number=1, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='raw_text', full_name='google.cloud.talent.v4beta1.ParseResumeResponse.raw_text', index=1,
      number=2, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=264,
  serialized_end=358,
)

_PARSERESUMERESPONSE.fields_by_name['profile'].message_type = google_dot_cloud_dot_talent__v4beta1_dot_proto_dot_profile__pb2._PROFILE
DESCRIPTOR.message_types_by_name['ParseResumeRequest'] = _PARSERESUMEREQUEST
DESCRIPTOR.message_types_by_name['ParseResumeResponse'] = _PARSERESUMERESPONSE
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

ParseResumeRequest = _reflection.GeneratedProtocolMessageType('ParseResumeRequest', (_message.Message,), dict(
  DESCRIPTOR = _PARSERESUMEREQUEST,
  __module__ = 'google.cloud.talent_v4beta1.proto.resume_service_pb2'
  ,
  __doc__ = """Parse resume request.
  
  
  Attributes:
      parent:
          Required.  The resource name of the project.  The format is
          "projects/{project\_id}", for example, "projects/api-test-
          project".
      resume:
          Required.  The bytes of the resume file in common format.
          Currently the API supports the following formats: PDF, TXT,
          DOC, RTF and DOCX.
      region_code:
          Optional.  The region code indicating where the resume is
          from. Values are as per the ISO-3166-2 format. For example,
          US, FR, DE.  This value is optional, but providing this value
          improves the resume parsing quality and performance.  An error
          is thrown if the regionCode is invalid.
      language_code:
          Optional.  The language code of contents in the resume.
          Language codes must be in BCP-47 format, such as "en-US" or
          "sr-Latn". For more information, see `Tags for Identifying
          Languages <https://tools.ietf.org/html/bcp47>`__\ {:
          class="external" target="\_blank" }.
  """,
  # @@protoc_insertion_point(class_scope:google.cloud.talent.v4beta1.ParseResumeRequest)
  ))
_sym_db.RegisterMessage(ParseResumeRequest)

ParseResumeResponse = _reflection.GeneratedProtocolMessageType('ParseResumeResponse', (_message.Message,), dict(
  DESCRIPTOR = _PARSERESUMERESPONSE,
  __module__ = 'google.cloud.talent_v4beta1.proto.resume_service_pb2'
  ,
  __doc__ = """Parse resume response.
  
  
  Attributes:
      profile:
          The profile parsed from resume.
      raw_text:
          Raw text from resume.
  """,
  # @@protoc_insertion_point(class_scope:google.cloud.talent.v4beta1.ParseResumeResponse)
  ))
_sym_db.RegisterMessage(ParseResumeResponse)


DESCRIPTOR._options = None

_RESUMESERVICE = _descriptor.ServiceDescriptor(
  name='ResumeService',
  full_name='google.cloud.talent.v4beta1.ResumeService',
  file=DESCRIPTOR,
  index=0,
  serialized_options=None,
  serialized_start=361,
  serialized_end=546,
  methods=[
  _descriptor.MethodDescriptor(
    name='ParseResume',
    full_name='google.cloud.talent.v4beta1.ResumeService.ParseResume',
    index=0,
    containing_service=None,
    input_type=_PARSERESUMEREQUEST,
    output_type=_PARSERESUMERESPONSE,
    serialized_options=_b('\202\323\344\223\002/\"*/v4beta1/{parent=projects/*}/resumes:parse:\001*'),
  ),
])
_sym_db.RegisterServiceDescriptor(_RESUMESERVICE)

DESCRIPTOR.services_by_name['ResumeService'] = _RESUMESERVICE

# @@protoc_insertion_point(module_scope)
