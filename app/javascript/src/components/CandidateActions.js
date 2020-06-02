// Renders the various actions for a candidate based on its status.
import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import {
  FileText,
  MessageCircle,
  Award,
  Trash,
  Info,
  UserCheck,
  PhoneCall,
} from "@styled-icons/feather";
import {
  Text,
  Padding,
  Button,
  useModal,
  DialogDisclosure,
} from "@advisable/donut";
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
  Applied: function AppliedActions({
    requestCallModal,
    application,
    modal,
    setModal,
  }) {
    return (
      <React.Fragment>
        <RequestIntroduction
          modal={requestCallModal}
          application={application}
        />
        <RejectModal
          isOpen={modal === REJECT_MODAL}
          onRequestCall={() => setModal(REQUEST_INTRODUCTION)}
          application={application}
          onClose={() => setModal(null)}
        />
        <DialogDisclosure
          as={Button}
          mb="xs"
          align="left"
          width="100%"
          intent="success"
          prefix={<PhoneCall />}
          {...requestCallModal}
        >
          Request Call
        </DialogDisclosure>
        <Button
          align="left"
          width="100%"
          variant="subtle"
          prefix={<Trash />}
          onClick={() => setModal(REJECT_MODAL)}
        >
          Provide Feedback
        </Button>
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
          <Button
            mb="xs"
            width="100%"
            align="left"
            prefix={<UserCheck />}
            onClick={() => history.push(`/book/${application.airtableId}`)}
          >
            Start working with {application.specialist.firstName}
          </Button>
          <Button
            mb="xs"
            width="100%"
            align="left"
            variant="subtle"
            prefix={<MessageCircle />}
            onClick={() => setModal(TALK_MODAL)}
          >
            Message {application.specialist.firstName}
          </Button>
          <Button
            mb="xs"
            width="100%"
            align="left"
            variant="subtle"
            prefix={<Award />}
            disabled={application.referencesRequested}
            onClick={() => setModal(REQUEST_REFERENCES_MODAL)}
          >
            Request References
          </Button>
          <Button
            width="100%"
            align="left"
            variant="subtle"
            prefix={<Trash />}
            onClick={() => setModal(REJECT_MODAL)}
          >
            Provide Feedback
          </Button>
        </Padding>
        {application.referencesRequested && (
          <Padding top="m">
            <Notice icon={<Info />}>
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
          <Button
            align="left"
            as={Link}
            prefix={<FileText />}
            mb="xs"
            width="100%"
            to={`/projects/${projectId}/applications/${application.airtableId}/proposal`}
          >
            View Proposal
          </Button>
          <Button
            align="left"
            variant="subtle"
            onClick={() => setModal(TALK_MODAL)}
            prefix={<MessageCircle />}
            mb="xs"
            width="100%"
          >
            Message
          </Button>
          <Button
            align="left"
            prefix={<Award />}
            variant="subtle"
            mb="xs"
            width="100%"
            disabled={application.referencesRequested}
            onClick={() => setModal(REQUEST_REFERENCES_MODAL)}
          >
            Request References
          </Button>
          <Button
            align="left"
            width="100%"
            variant="subtle"
            prefix={<Trash />}
            onClick={() => setModal(REJECT_PROPOSAL_MODAL)}
          >
            Provide Feedback
          </Button>
        </Padding>
        {application.referencesRequested && (
          <Padding top="m">
            <Notice icon={<Info />}>
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
  const requestCallModal = useModal();

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
        requestCallModal,
      })
    : null;
};

export default withRouter(CandidateActions);
