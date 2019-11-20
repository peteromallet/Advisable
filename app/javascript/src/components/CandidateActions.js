// Renders the various actions for a candidate based on its status.
import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import { Text, Padding, Flex, Button } from "@advisable/donut";
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
  Applied: ({ application, stack, modal, setModal }) => {
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
        <Flex
          spacing="xs"
          distribute="evenly"
          direction={{
            default: stack ? "vertical" : "horizontal",
            s: "vertical",
          }}
        >
          <Button
            align="left"
            width="100%"
            intent="success"
            icon="phone-call"
            appearance="primary"
            onClick={() => setModal(REQUEST_INTRODUCTION)}
          >
            Request Call
          </Button>
          <Button
            align="left"
            icon="trash"
            width="100%"
            onClick={() => setModal(REJECT_MODAL)}
          >
            Provide Feedback
          </Button>
        </Flex>
      </React.Fragment>
    );
  },
  "Application Accepted": ({
    application,
    history,
    stack,
    modal,
    setModal,
  }) => {
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
          <Flex
            spacing="xs"
            distribute="evenly"
            direction={{
              default: stack ? "vertical" : "horiztonal",
              s: "vertical",
            }}
          >
            <Button
              width="100%"
              align="left"
              intent="success"
              icon="user-check"
              appearance="primary"
              onClick={() => history.push(`/book/${application.airtableId}`)}
            >
              Start working with {application.specialist.firstName}
            </Button>
            <Button
              width="100%"
              align="left"
              icon="message-circle"
              onClick={() => setModal(TALK_MODAL)}
            >
              Message {application.specialist.firstName}
            </Button>
          </Flex>
        </Padding>
        <Flex
          spacing="xs"
          distribute="evenly"
          direction={{
            default: stack ? "vertical" : "horiztonal",
            s: "vertical",
          }}
        >
          <Button
            width="100%"
            icon="award"
            align="left"
            disabled={application.referencesRequested}
            onClick={() => setModal(REQUEST_REFERENCES_MODAL)}
          >
            Request References
          </Button>
          <Button
            icon="trash"
            width="100%"
            align="left"
            onClick={() => setModal(REJECT_MODAL)}
          >
            Provide Feedback
          </Button>
        </Flex>
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
  Proposed: ({ projectId, application, stack, modal, setModal }) => {
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
          <Flex
            spacing="xs"
            distribute="evenly"
            direction={{
              default: stack ? "vertical" : "horiztonal",
              s: "vertical",
            }}
          >
            <Button
              as={Link}
              width="100%"
              align="left"
              intent="success"
              icon="file-text"
              appearance="primary"
              to={`/projects/${projectId}/applications/${application.airtableId}/proposal`}
            >
              View Proposal
            </Button>
            <Button
              width="100%"
              align="left"
              icon="message-circle"
              onClick={() => setModal(TALK_MODAL)}
            >
              Message {application.specialist.firstName}
            </Button>
          </Flex>
        </Padding>

        <Flex
          spacing="xs"
          distribute="evenly"
          direction={{
            default: stack ? "vertical" : "horiztonal",
            s: "vertical",
          }}
        >
          <Button
            width="100%"
            icon="award"
            align="left"
            disabled={application.referencesRequested}
            onClick={() => setModal(REQUEST_REFERENCES_MODAL)}
          >
            Request References
          </Button>
          <Button
            icon="trash"
            width="100%"
            align="left"
            onClick={() => setModal(REJECT_PROPOSAL_MODAL)}
          >
            Provide Feedback
          </Button>
        </Flex>
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
