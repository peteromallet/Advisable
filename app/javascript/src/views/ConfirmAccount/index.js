import React, { useEffect } from "react";
import { get } from "lodash";
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

  if (!parsed.email) {
    return <Redirect to="/" />;
  }

  const confirmAccount = async () => {
    const { data } = await mutate({
      variables: { input: { token: match.params.token, email: parsed.email } }
    });
    const user = data.confirmAccount.user || {};
    const error = get(data.confirmAccount, "errors[0]", {});

    if (user.confirmed) {
      notifications.notify("Your account has been confirmed");
    } else {
      if (error.code == 'accounts.already_confirmed') {
        notifications.notify("Your account has already been confirmed");
      } else {
        notifications.notify("Failed to confirm your account");
      }
    }

    history.replace("/");
  }

  useEffect(() => {
    confirmAccount()
  }, []);

  return <Loading />;
};

export default graphql(CONFIRM_ACCOUNT)(withNotifications(ConfirmAccount));
