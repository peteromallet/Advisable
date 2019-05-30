import React from "react";
import { withRouter } from "react-router";
import Button from "../../components/Button";
import ButtonGroup from "../../components/ButtonGroup";
import RejectProposalModal from "../../components/RejectProposalModal";
import CreateBookingModal from "../../components/CreateBookingModal";

const ProposalActions = ({ application, specialist, history }) => {
  const [modal, setModal] = React.useState(null);

  const afterReject = () => {
    setModal(null);
  };

  if (application.status !== "Proposed") return null;

  return (
    <>
      <CreateBookingModal
        isOpen={modal === "ACCEPT"}
        application={application}
        firstName={specialist.firstName}
        onClose={() => setModal(null)}
        onCreate={app => {
          history.replace(`/manage/${app.airtableId}`);
        }}
      />
      <RejectProposalModal
        isOpen={modal === "REJECT"}
        application={application}
        specialist={specialist}
        onReject={afterReject}
        onClose={() => setModal(null)}
      />
      <ButtonGroup fullWidth stack>
        <Button onClick={() => setModal("ACCEPT")} styling="green">
          Start working with {specialist.firstName}
        </Button>
        <Button onClick={() => setModal("REJECT")}>Reject application</Button>
      </ButtonGroup>
    </>
  );
};

export default withRouter(ProposalActions);
