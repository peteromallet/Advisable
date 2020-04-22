import React from "react";
import { useHistory } from "react-router-dom";
import { RoundedButton } from "@advisable/donut";
import { UserCheck } from "@styled-icons/feather";

const CreateBookingButton = ({ application }) => {
  const history = useHistory();

  return (
    <RoundedButton
      width="100%"
      prefix={<UserCheck />}
      onClick={() => history.push(`/book/${application.airtableId}`)}
    >
      Start working with {application.specialist.firstName}
    </RoundedButton>
  );
};

export default CreateBookingButton;
