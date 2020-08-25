import React from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import Loading from "../../../components/Loading";
import VIEWER, { viewerFields } from "../../../graphql/queries/viewer";
import { useNotifications } from "../../../components/Notifications";

export const CONFIRM = gql`
  ${viewerFields}

  mutation ConfirmAccount($input: ConfirmAccountInput!) {
    confirmAccount(input: $input) {
      viewer {
        ...ViewerFields
      }
    }
  }
`;

// Renders the freelancer signup flow.
const ConfirmAccount = ({ token, email, history }) => {
  const notifications = useNotifications();

  const [confirm] = useMutation(CONFIRM, {
    errorPolicy: "all",
    update(cache, response) {
      const existing = cache.readQuery({ query: VIEWER });
      cache.writeQuery({
        query: VIEWER,
        data: {
          viewer: {
            ...existing.viewer,
            ...response.data.confirmAccount.viewer,
          },
        },
      });
    },
  });

  React.useEffect(() => {
    confirmAccount();
  }, []);

  const confirmAccount = async () => {
    const { errors, data } = await confirm({
      variables: {
        input: {
          token,
          email,
        },
      },
    });

    if (errors) {
      notifications.notify("Failed to confirm your account. Please try again.");
      history.replace("/freelancers/signup/confirm");
    } else {
      window.localStorage.setItem("authToken", data.confirmAccount.token);
      window.location = "/freelancers/signup/preferences";
    }
  };

  return <Loading />;
};

export default ConfirmAccount;
