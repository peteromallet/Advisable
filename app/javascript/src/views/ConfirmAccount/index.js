import React, { useEffect } from "react";
import queryString from "query-string";
import { useMutation } from "@apollo/client";
import { Redirect } from "react-router-dom";
import Loading from "src/components/Loading";
import { useNotifications } from "src/components/Notifications";
import CONFIRM_ACCOUNT from "./confirmAccount.graphql";

const ConfirmAccount = ({ match, location, history }) => {
  const [mutate] = useMutation(CONFIRM_ACCOUNT);
  const notifications = useNotifications();
  const parsed = queryString.parse(location.search);

  if (!parsed.email) {
    return <Redirect to="/" />;
  }

  const confirmAccount = async () => {
    const { errors } = await mutate({
      variables: { input: { token: match.params.token, email: parsed.email } },
    });

    if (errors) {
      const error = errors[0];
      if (error.extensions.code == "accounts.already_confirmed") {
        notifications.notify("Your account has already been confirmed");
      } else {
        notifications.notify("Failed to confirm your account");
      }
    } else {
      notifications.notify("Your account has been confirmed");
    }

    history.replace("/");
  };

  useEffect(() => {
    confirmAccount();
  }, []);

  return <Loading />;
};

export default ConfirmAccount;
