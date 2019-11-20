import React from "react";
import { Button } from "@advisable/donut";
import { useHistory } from "react-router-dom";

const CreateBookingButton = ({ application }) => {
  const history = useHistory();

  return (
    <>
      <Button
        width="100%"
        intent="success"
        icon="user-check"
        appearance="primary"
        onClick={() => history.push(`/book/${application.airtableId}`)}
      >
        Start working with {application.specialist.firstName}
      </Button>
    </>
  );
};

export default CreateBookingButton;
