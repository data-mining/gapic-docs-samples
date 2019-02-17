<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: google/cloud/dialogflow/v2beta1/session.proto

namespace Google\Cloud\Dialogflow\V2beta1;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Represents the result of querying a Knowledge base.
 *
 * Generated from protobuf message <code>google.cloud.dialogflow.v2beta1.KnowledgeAnswers</code>
 */
class KnowledgeAnswers extends \Google\Protobuf\Internal\Message
{
    /**
     * A list of answers from Knowledge Connector.
     *
     * Generated from protobuf field <code>repeated .google.cloud.dialogflow.v2beta1.KnowledgeAnswers.Answer answers = 1;</code>
     */
    private $answers;

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type \Google\Cloud\Dialogflow\V2beta1\KnowledgeAnswers\Answer[]|\Google\Protobuf\Internal\RepeatedField $answers
     *           A list of answers from Knowledge Connector.
     * }
     */
    public function __construct($data = NULL) {
        \GPBMetadata\Google\Cloud\Dialogflow\V2Beta1\Session::initOnce();
        parent::__construct($data);
    }

    /**
     * A list of answers from Knowledge Connector.
     *
     * Generated from protobuf field <code>repeated .google.cloud.dialogflow.v2beta1.KnowledgeAnswers.Answer answers = 1;</code>
     * @return \Google\Protobuf\Internal\RepeatedField
     */
    public function getAnswers()
    {
        return $this->answers;
    }

    /**
     * A list of answers from Knowledge Connector.
     *
     * Generated from protobuf field <code>repeated .google.cloud.dialogflow.v2beta1.KnowledgeAnswers.Answer answers = 1;</code>
     * @param \Google\Cloud\Dialogflow\V2beta1\KnowledgeAnswers\Answer[]|\Google\Protobuf\Internal\RepeatedField $var
     * @return $this
     */
    public function setAnswers($var)
    {
        $arr = GPBUtil::checkRepeatedField($var, \Google\Protobuf\Internal\GPBType::MESSAGE, \Google\Cloud\Dialogflow\V2beta1\KnowledgeAnswers\Answer::class);
        $this->answers = $arr;

        return $this;
    }

}
