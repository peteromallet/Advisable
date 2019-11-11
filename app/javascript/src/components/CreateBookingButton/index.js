import React from "react";
import { Button } from "@advisable/donut";
import { useHistory } from "react-router-dom";
import CreateBookingModal from "../CreateBookingModal";

// Renders a button which when clicked will open the "start working" modal to
// convert an application into a booking.
const CreateBookingButton = ({ application }) => {
  const history = useHistory();
  const [isOpen, setOpen] = React.useState(false);

  return (
    <>
      <CreateBookingModal
        isOpen={isOpen}
        application={application}
        onClose={() => setOpen(false)}
        onCreate={b => history.push(`/manage/${b.airtableId}`)}
      />
      <Button
        width="100%"
        intent="success"
        icon="user-check"
        appearance="primary"
        onClick={() => setOpen(true)}
      >
        Start working with {application.specialist.firstName}
      </Button>
    </>
  );
};

export default CreateBookingButton;
