import React, { useEffect, useCallback } from "react";
import queryString from "query-string";
import { useMutation, useApolloClient } from "@apollo/client";
import { Redirect } from "react-router-dom";
import Loading from "src/components/Loading";
import { useNotifications } from "src/components/Notifications";
import CONFIRM_ACCOUNT from "./confirmAccount.graphql";

const ConfirmAccount = ({ match, location, history }) => {
  const client = useApolloClient();
  const [mutate] = useMutation(CONFIRM_ACCOUNT);
  const notifications = useNotifications();
  const parsed = queryString.parse(location.search);

  const confirmAccount = useCallback(async () => {
    const { errors } = await mutate({
      variables: { input: { token: match.params.token, email: parsed.email } },
    });

    const errorCode = errors?.graphQLErrors?.[0]?.extensions?.code;

    if (errorCode === "ALREADY_CONFIRMED") {
      notifications.notify("Your account has already been confirmed");
    }

    if (errorCode === "INVALID_CONFIRMATION_TOKEN") {
      notifications.notify("Failed to confirm your account, please try again.");
    }

    if (!errorCode) {
      notifications.notify("Your account has been confirmed");
    }

    await client.resetStore();
    history.replace("/");
  }, []);

  useEffect(() => {
    if (!parsed.email) return;
    confirmAccount();
  }, [parsed.email, confirmAccount]);

  if (!parsed.email) {
    return <Redirect to="/" />;
  }

  return <Loading />;
};

export default ConfirmAccount;
