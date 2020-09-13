import React from "react";
import { Button, useModal } from "@advisable/donut";
import RejectModal from "../RejectModal";
import RequestIntroduction from "../RequestIntroduction";
import { Trash } from "@styled-icons/feather";

// Reners a button which when clicked will open the modal to decline an
// application.
const DeclineApplicationButton = ({ application }) => {
  const modal = useModal();
  const [isOpen, setOpen] = React.useState(false);

  return (
    <>
      <RequestIntroduction modal={modal} application={application} />
      <RejectModal
        isOpen={isOpen}
        onRequestCall={modal.toggle}
        application={application}
        onClose={() => setOpen(false)}
      />
      <Button
        variant="subtle"
        prefix={<Trash />}
        width="100%"
        onClick={() => setOpen(true)}
      >
        Decline Application
      </Button>
    </>
  );
};

export default DeclineApplicationButton;
