import React, { useEffect, useCallback } from "react";
import queryString from "query-string";
import { useMutation, useApolloClient } from "@apollo/client";
import {
  Redirect,
  useRouteMatch,
  useLocation,
  useHistory,
} from "react-router-dom";
import Loading from "src/components/Loading";
import { useNotifications } from "src/components/Notifications";
import CONFIRM_ACCOUNT from "./confirmAccount.graphql";

const ConfirmAccount = () => {
  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch();
  const client = useApolloClient();
  const [mutate] = useMutation(CONFIRM_ACCOUNT);
  const { notify } = useNotifications();
  const parsed = queryString.parse(location.search);

  const confirmAccount = useCallback(async () => {
    const { errors } = await mutate({
      variables: { input: { token: match.params.token, email: parsed.email } },
    });

    const errorCode = errors?.[0]?.extensions?.code;

    if (errorCode === "INVALID_CONFIRMATION_TOKEN") {
      notify("Failed to confirm your account, please try again.");
    }

    if (!errorCode) {
      notify("Your account has been confirmed");
    }

    await client.resetStore();
    history.replace("/");
  }, [notify, client, mutate, history, parsed.email, match.params.token]);

  useEffect(() => {
    confirmAccount();
  }, [confirmAccount]);

  if (!parsed.email) {
    return <Redirect to="/" />;
  }

  return <Loading />;
};

export default ConfirmAccount;
