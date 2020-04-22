import React from "react";
import { Button } from "@advisable/donut";
import RejectModal from "../RejectModal";
import RequestIntroduction from "../RequestIntroduction";
import { Trash } from "@styled-icons/feather";

// Reners a button which when clicked will open the modal to decline an
// application.
const DeclineApplicationButton = ({ application }) => {
  const [isOpen, setOpen] = React.useState(false);
  const [requestIntro, setRequestIntro] = React.useState(false);

  return (
    <>
      <RequestIntroduction
        isOpen={requestIntro}
        application={application}
        onClose={() => setRequestIntro(false)}
      />
      <RejectModal
        isOpen={isOpen}
        onRequestCall={() => setRequestIntro(true)}
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
