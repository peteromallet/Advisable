import React from "react";
import Button from "../../components/Button";
import ButtonGroup from "../../components/ButtonGroup";
import RejectProposalModal from "../../components/RejectProposalModal";
import AcceptModal from "./AcceptModal";

const ProposalActions = ({ bookingId, specialist }) => {
  const [modal, setModal] = React.useState(null);

  return (
    <>
      <AcceptModal
        isOpen={modal === "ACCEPT"}
        bookingId={bookingId}
        firstName={specialist.firstName}
        onClose={() => setModal(null)}
      />
      <RejectProposalModal
        isOpen={modal === "REJECT"}
        bookingId={bookingId}
        specialist={specialist}
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

export default ProposalActions;
