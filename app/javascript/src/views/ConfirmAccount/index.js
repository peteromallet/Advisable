import React, { useEffect } from "react";
import queryString from "query-string";
import { graphql } from "react-apollo";
import { Redirect } from "react-router-dom";
import Loading from "src/components/Loading";
import { withNotifications } from "src/components/Notifications";
import CONFIRM_ACCOUNT from "./confirmAccount.graphql";

const ConfirmAccount = ({
  match,
  location,
  history,
  mutate,
  notifications
}) => {
  const parsed = queryString.parse(location.search);
  console.log(parsed);

  if (!parsed.email) {
    return <Redirect to="/" />;
  }

  useEffect(async () => {
    const { data } = await mutate({
      variables: { input: { token: match.params.token, email: parsed.email } }
    });
    const user = data.confirmAccount.user || {};

    if (user.confirmed) {
      notifications.notify("Your account has been confirmed");
    } else {
      notifications.notify("Failed to confirm your account");
    }

    return history.replace("/");
  }, []);

  return <Loading />;
};

export default graphql(CONFIRM_ACCOUNT)(withNotifications(ConfirmAccount));
