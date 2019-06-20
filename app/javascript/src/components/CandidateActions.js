// Renders the various actions for a candidate based on its status.
import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import Button from "src/components/Button";
import { Link } from "react-router-dom";
import useMobile from "src/utilities/useMobile";
import ButtonGroup from "src/components/ButtonGroup";
import RejectModal from "src/components/RejectModal";
import CreateBookingModal from "./CreateBookingModal";
import RequestReferences from "src/components/RequestReferences";
import RequestIntroduction from "src/components/RequestIntroduction";
import RejectProposalModal from "src/components/RejectProposalModal";
import TalkModal from "./TalkModal";

const REJECT_MODAL = "REJECT";
const TALK_MODAL = "TALK_MODAL";
const REQUEST_INTRODUCTION = "REQUEST_INTRODUCTION";
const REJECT_PROPOSAL_MODAL = "REJECT_PROPOSAL_MODAL";
const REQUEST_REFERENCES_MODAL = "REQUEST_REFERENCES_MODAL";
const CREATE_BOOKING_MODAL = "CREATE_BOOKING_MODAL";

const statusActions = {
  Applied: ({ application, stack, fullWidth }) => {
    const isMobile = useMobile();
    const [modal, setModal] = useState(null);

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
        <ButtonGroup stack={stack || isMobile} fullWidth={fullWidth}>
          <Button
            styling="primary"
            onClick={() => setModal(REQUEST_INTRODUCTION)}
          >
            Request Call
          </Button>
          <Button onClick={() => setModal(REJECT_MODAL)}>
            Provide Feedback
          </Button>
        </ButtonGroup>
      </React.Fragment>
    );
  },
  "Application Accepted": ({ application, history, stack, fullWidth }) => {
    const isMobile = useMobile();
    const [modal, setModal] = useState(null);

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
        <CreateBookingModal
          onClose={() => setModal(null)}
          application={application}
          isOpen={modal === CREATE_BOOKING_MODAL}
          onCreate={b => history.push(`/manage/${b.airtableId}`)}
        />
        <TalkModal
          isOpen={modal === TALK_MODAL}
          onClose={() => setModal(null)}
          conversationId={application.id}
          participants={[application.specialist]}
        />
        <ButtonGroup stack={stack || isMobile} fullWidth={fullWidth}>
          <Button
            styling="green"
            onClick={() => setModal(CREATE_BOOKING_MODAL)}
          >
            Start working with {application.specialist.firstName}
          </Button>
          <Button onClick={() => setModal(TALK_MODAL)}>
            Message {application.specialist.firstName}
          </Button>
          <Button onClick={() => setModal(REJECT_MODAL)}>
            Provide Feedback
          </Button>
          {!application.referencesRequested && (
            <Button onClick={() => setModal(REQUEST_REFERENCES_MODAL)}>
              Request References
            </Button>
          )}
        </ButtonGroup>
      </Fragment>
    );
  },
  Proposed: ({ projectId, application, history, stack, fullWidth }) => {
    const isMobile = useMobile();
    const [modal, setModal] = useState(null);

    return (
      <Fragment>
        <RejectProposalModal
          application={application}
          specialist={application.specialist}
          isOpen={modal === REJECT_PROPOSAL_MODAL}
          onClose={() => setModal(null)}
        />
        <RequestReferences
          application={application}
          isOpen={modal === REQUEST_REFERENCES_MODAL}
          onClose={() => setModal(null)}
        />
        <TalkModal
          isOpen={modal === TALK_MODAL}
          onClose={() => setModal(null)}
          conversationId={application.id}
          participants={[application.specialist]}
        />
        <ButtonGroup stack={stack || isMobile} fullWidth={fullWidth}>
          <Button
            as={Link}
            styling="primary"
            to={`/projects/${projectId}/applications/${
              application.airtableId
            }/proposal`}
          >
            View Proposal
          </Button>
          <Button onClick={() => setModal(TALK_MODAL)}>
            Message {application.specialist.firstName}
          </Button>
          <Button onClick={() => setModal(REJECT_PROPOSAL_MODAL)}>
            Reject
          </Button>
          {!application.referencesRequested && (
            <Button onClick={() => setModal(REQUEST_REFERENCES_MODAL)}>
              Request References
            </Button>
          )}
        </ButtonGroup>
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
  const actions = statusActions[application.status];
  return actions
    ? actions({ projectId, application, history, stack, fullWidth })
    : null;
};

export default withRouter(CandidateActions);
