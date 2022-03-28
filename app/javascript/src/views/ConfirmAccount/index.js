import React, { useEffect, useCallback } from "react";
import queryString from "query-string";
import { useMutation, useApolloClient } from "@apollo/client";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "src/components/Loading";
import { useNotifications } from "src/components/Notifications";
import CONFIRM_ACCOUNT from "./confirmAccount.graphql";

const ConfirmAccount = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const client = useApolloClient();
  const [mutate] = useMutation(CONFIRM_ACCOUNT);
  const { notify } = useNotifications();
  const parsed = queryString.parse(location.search);

  const confirmAccount = useCallback(async () => {
    const { errors } = await mutate({
      variables: { input: { token: token, email: parsed.email } },
    });

    const errorCode = errors?.[0]?.extensions?.code;

    if (errorCode === "INVALID_CONFIRMATION_TOKEN") {
      notify("Failed to confirm your account, please try again.");
    }

    if (!errorCode) {
      notify("Your account has been confirmed");
    }

    await client.resetStore();
    navigate("/", { replace: true });
  }, [notify, client, mutate, parsed.email, token, navigate]);

  useEffect(() => {
    confirmAccount();
  }, [confirmAccount]);

  if (!parsed.email) {
    return <Navigate to="/" />;
  }

  return <Loading />;
};

export default ConfirmAccount;
