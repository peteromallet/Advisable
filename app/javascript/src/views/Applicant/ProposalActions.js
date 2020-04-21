import React from "react";
import { withRouter } from "react-router";
import { RoundedButton, Stack } from "@advisable/donut";
import RejectProposalModal from "../../components/RejectProposalModal";

const ProposalActions = ({ application, specialist, history }) => {
  const [modal, setModal] = React.useState(null);

  const afterReject = () => {
    setModal(null);
  };

  if (application.status !== "Proposed") return null;

  return (
    <>
      <RejectProposalModal
        isOpen={modal === "REJECT"}
        application={application}
        specialist={specialist}
        onReject={afterReject}
        onClose={() => setModal(null)}
      />
      <Stack spacing="xs">
        <RoundedButton
          width="100%"
          onClick={() => history.push(`/book/${application.airtableId}`)}
        >
          {application.trialTask ? (
            <>Start risk-free trial with {specialist.firstName}</>
          ) : (
            <>Start working with {specialist.firstName}</>
          )}
        </RoundedButton>
        <RoundedButton
          width="100%"
          variant="dark"
          onClick={() => setModal("REJECT")}
        >
          Reject application
        </RoundedButton>
      </Stack>
    </>
  );
};

export default withRouter(ProposalActions);
