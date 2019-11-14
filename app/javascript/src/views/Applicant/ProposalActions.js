import React from "react";
import { withRouter } from "react-router";
import Button from "../../components/Button";
import ButtonGroup from "../../components/ButtonGroup";
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
      <ButtonGroup fullWidth stack>
        <Button
          onClick={() => history.push(`/book/${application.airtableId}`)}
          styling="green"
        >
          {application.trialTask ? (
            <>Start risk-free trial with {specialist.firstName}</>
          ) : (
            <>Start working with {specialist.firstName}</>
          )}
        </Button>
        <Button onClick={() => setModal("REJECT")}>Reject application</Button>
      </ButtonGroup>
    </>
  );
};

export default withRouter(ProposalActions);
