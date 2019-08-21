import React from "react";
import queryString from "query-string";
import { Redirect } from "react-router-dom";
import useViewer from "../../../hooks/useViewer";
import ConfirmAccount from "./ConfirmAccount";
import ConfirmationPending from "./ConfirmationPending";

// Renders the freelancer signup flow.
const Confirm = props => {
  const viewer = useViewer();
  const { t: token, email } = queryString.parse(props.location.search);

  if (!Boolean(viewer)) {
    return <Redirect to="/freelancers/signup" />;
  }

  if (viewer.confirmed) {
    return <Redirect to="/freelancers/signup/preferences" />;
  }

  if (token && email) {
    return <ConfirmAccount token={token} email={email} {...props} />;
  }

  return <ConfirmationPending {...props} />;
};

export default Confirm;
