// Renders the various actions for a candidate based on its status.
import React, { Fragment, useState } from "react";
import Button from "src/components/Button";
import Divider from "src/components/Divider";
import useMobile from "src/utilities/useMobile";
import ButtonGroup from "src/components/ButtonGroup";
import RejectModal from "src/components/RejectModal";
import RequestReferences from "src/components/RequestReferences";
import RequestIntroduction from "src/components/RequestIntroduction";
import RejectProposalModal from "src/components/RejectProposalModal";

const REJECT_MODAL = "REJECT";
const REQUEST_INTRODUCTION = "REQUEST_INTRODUCTION";
const REJECT_PROPOSAL_MODAL = "REJECT_PROPOSAL_MODAL";
const REQUEST_REFERENCES_MODAL = "REQUEST_REFERENCES_MODAL";

const statusActions = {
  Applied: ({ application }) => {
    const isMobile = useMobile();
    const [modal, setModal] = useState(null);

    return (
      <React.Fragment>
        <Divider marginTop="xl" marginBottom="xl" />
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
        <ButtonGroup stack={isMobile}>
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
  "Application Accepted": ({ application, history }) => {
    const isMobile = useMobile();
    const [modal, setModal] = useState(null);

    return (
      <Fragment>
        <Divider marginTop="xl" marginBottom="xl" />
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
        <ButtonGroup stack={isMobile}>
          <Button
            onClick={() => history.push(`applications/${application.id}/offer`)}
            styling="primary"
          >
            Send Offer
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
  Proposed: ({ application, history }) => {
    const isMobile = useMobile();
    const [modal, setModal] = useState(null);
    const { proposal } = application;

    if (!proposal) return null;

    return (
      <Fragment>
        <Divider marginTop="xl" marginBottom="xl" />
        <RejectProposalModal
          booking={proposal}
          specialist={application.specialist}
          isOpen={modal === REJECT_PROPOSAL_MODAL}
          onClose={() => setModal(null)}
        />
        <RequestReferences
          application={application}
          isOpen={modal === REQUEST_REFERENCES_MODAL}
          onClose={() => setModal(null)}
        />
        <ButtonGroup stack={isMobile}>
          <Button
            styling="primary"
            onClick={() => history.push(`proposals/${proposal.id}`)}
          >
            View Proposal
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
  }
};

export default ({ application, history }) => {
  const actions = statusActions[application.status];
  return actions ? actions({ application, history }) : null;
};
