import React from "react";
import queryString from "query-string";
import { Redirect } from "react-router-dom";
import ConfirmAccount from "./ConfirmAccount";
import ConfirmationPending from "./ConfirmationPending";

// Renders the freelancer signup flow.
const Confirm = props => {
  const viewer = props.specialist;
  const { t: token, email } = queryString.parse(props.location.search);

  if (viewer && viewer.confirmed) {
    return <Redirect to="/freelancers/signup/preferences" />;
  }

  if (token && email) {
    return <ConfirmAccount token={token} email={email} {...props} />;
  }

  return <ConfirmationPending {...props} />;
};

export default Confirm;
