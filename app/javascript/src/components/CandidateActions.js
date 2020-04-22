// Renders the various actions for a candidate based on its status.
import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import {
  FileText,
  MessageCircle,
  Award,
  Trash,
  UserCheck,
  PhoneCall,
} from "@styled-icons/feather";
import { Text, Padding, RoundedButton } from "@advisable/donut";
import { Link } from "react-router-dom";
import useMobile from "src/utilities/useMobile";
import RejectModal from "src/components/RejectModal";
import RequestReferences from "src/components/RequestReferences";
import RequestIntroduction from "src/components/RequestIntroduction";
import RejectProposalModal from "src/components/RejectProposalModal";
import TalkModal from "./TalkModal";
import Notice from "./Notice";

const REJECT_MODAL = "REJECT";
const TALK_MODAL = "TALK_MODAL";
const REQUEST_INTRODUCTION = "REQUEST_INTRODUCTION";
const REJECT_PROPOSAL_MODAL = "REJECT_PROPOSAL_MODAL";
const REQUEST_REFERENCES_MODAL = "REQUEST_REFERENCES_MODAL";

const statusActions = {
  Applied: function AppliedActions({ application, stack, modal, setModal }) {
    return (
      <React.Fragment>
        <RequestIntroduction
          isOpen={modal === REQUEST_INTRODUCTION}
          application={application}
          onClose={() => setModal(null)}
        />
        <RejectModal
          isOpen={modal === REJECT_MODAL}
          onRequestCall={() => setModal(REQUEST_INTRODUCTION)}
          application={application}
          onClose={() => setModal(null)}
        />
        <RoundedButton
          mb="xs"
          align="left"
          width="100%"
          intent="success"
          prefix={<PhoneCall />}
          onClick={() => setModal(REQUEST_INTRODUCTION)}
        >
          Request Call
        </RoundedButton>
        <RoundedButton
          align="left"
          width="100%"
          variant="subtle"
          prefix={<Trash />}
          onClick={() => setModal(REJECT_MODAL)}
        >
          Provide Feedback
        </RoundedButton>
      </React.Fragment>
    );
  },
  "Application Accepted": function ApplicationAcceptedActions({
    application,
    history,
    stack,
    modal,
    setModal,
  }) {
    return (
      <Fragment>
        <RejectModal
          isOpen={modal === REJECT_MODAL}
          onRequestCall={() => setModal(REQUEST_INTRODUCTION)}
          application={application}
          onClose={() => setModal(null)}
        />
        <RequestReferences
          name={application.specialist.name}
          applicationId={application.airtableId}
          isOpen={modal === REQUEST_REFERENCES_MODAL}
          onClose={() => setModal(null)}
        />
        <TalkModal
          isOpen={modal === TALK_MODAL}
          onClose={() => setModal(null)}
          conversationId={application.id}
          participants={[application.specialist]}
        />
        <Padding bottom="xs">
          <RoundedButton
            mb="xs"
            width="100%"
            align="left"
            icon="user-check"
            prefix={<UserCheck />}
            onClick={() => history.push(`/book/${application.airtableId}`)}
          >
            Start working with {application.specialist.firstName}
          </RoundedButton>
          <RoundedButton
            mb="xs"
            width="100%"
            align="left"
            variant="subtle"
            prefix={<MessageCircle />}
            onClick={() => setModal(TALK_MODAL)}
          >
            Message {application.specialist.firstName}
          </RoundedButton>
          <RoundedButton
            mb="xs"
            width="100%"
            align="left"
            variant="subtle"
            prefix={<Award />}
            disabled={application.referencesRequested}
            onClick={() => setModal(REQUEST_REFERENCES_MODAL)}
          >
            Request References
          </RoundedButton>
          <RoundedButton
            width="100%"
            align="left"
            variant="subtle"
            prefix={<Trash />}
            onClick={() => setModal(REJECT_MODAL)}
          >
            Provide Feedback
          </RoundedButton>
        </Padding>
        {application.referencesRequested && (
          <Padding top="m">
            <Notice icon="info">
              <Padding bottom="xxs">
                <Text size="xxs" weight="medium">
                  References requested
                </Text>
              </Padding>
              <Text size="xxs" color="neutral.N7" multiline>
                You have requested references from{" "}
                {application.specialist.firstName} and will add them here once
                we receive them.
              </Text>
            </Notice>
          </Padding>
        )}
      </Fragment>
    );
  },
  Proposed: function ProposedActions({
    projectId,
    application,
    modal,
    setModal,
  }) {
    return (
      <Fragment>
        <RejectProposalModal
          application={application}
          specialist={application.specialist}
          isOpen={modal === REJECT_PROPOSAL_MODAL}
          onClose={() => setModal(null)}
        />
        <RequestReferences
          name={application.specialist.name}
          applicationId={application.airtableId}
          isOpen={modal === REQUEST_REFERENCES_MODAL}
          onClose={() => setModal(null)}
        />
        <TalkModal
          isOpen={modal === TALK_MODAL}
          onClose={() => setModal(null)}
          conversationId={application.id}
          participants={[application.specialist]}
        />
        <Padding bottom="xs">
          <RoundedButton
            align="left"
            as={Link}
            prefix={<FileText />}
            mb="xs"
            width="100%"
            to={`/projects/${projectId}/applications/${application.airtableId}/proposal`}
          >
            View Proposal
          </RoundedButton>
          <RoundedButton
            align="left"
            variant="subtle"
            onClick={() => setModal(TALK_MODAL)}
            prefix={<MessageCircle />}
            mb="xs"
            width="100%"
          >
            Message
          </RoundedButton>
          <RoundedButton
            align="left"
            prefix={<Award />}
            variant="subtle"
            mb="xs"
            width="100%"
            disabled={application.referencesRequested}
            onClick={() => setModal(REQUEST_REFERENCES_MODAL)}
          >
            Request References
          </RoundedButton>
          <RoundedButton
            align="left"
            width="100%"
            variant="subtle"
            prefix={<Trash />}
            onClick={() => setModal(REJECT_PROPOSAL_MODAL)}
          >
            Provide Feedback
          </RoundedButton>
        </Padding>
        {application.referencesRequested && (
          <Padding top="m">
            <Notice icon="info">
              <Padding bottom="xxs">
                <Text size="xxs" weight="medium">
                  References requested
                </Text>
              </Padding>
              <Text size="xxs" color="neutral.N7" multiline>
                You have requested references from{" "}
                {application.specialist.firstName} and will add them here once
                we receive them.
              </Text>
            </Notice>
          </Padding>
        )}
      </Fragment>
    );
  },
};

const CandidateActions = ({
  projectId,
  application,
  history,
  stack,
  fullWidth,
}) => {
  const isMobile = useMobile();
  const [modal, setModal] = useState(null);
  const actions = statusActions[application.status];

  return actions
    ? actions({
        projectId,
        application,
        history,
        stack,
        fullWidth,
        modal,
        setModal,
        isMobile,
      })
    : null;
};

export default withRouter(CandidateActions);
