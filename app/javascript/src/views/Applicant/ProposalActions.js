import React from "react";
import { withRouter } from "react-router";
import { Button, Stack } from "@advisable/donut";
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
        <Button
          width="100%"
          onClick={() => history.push(`/book/${application.airtableId}`)}
        >
          {application.trialTask ? (
            <>Start risk-free trial with {specialist.firstName}</>
          ) : (
            <>Start working with {specialist.firstName}</>
          )}
        </Button>
        <Button width="100%" variant="dark" onClick={() => setModal("REJECT")}>
          Reject application
        </Button>
      </Stack>
    </>
  );
};

export default withRouter(ProposalActions);
