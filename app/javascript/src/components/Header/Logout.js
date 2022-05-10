import React from "react";
import { Box } from "@advisable/donut";
import { gql, useMutation } from "@apollo/client";
import { resetAnalytics } from "src/utilities/segment";

const LOGOUT = gql`
  mutation Logout {
    logout(input: {}) {
      success
    }
  }
`;

export default function Logout(props) {
  const [logout] = useMutation(LOGOUT);

  const handleLogout = async () => {
    resetAnalytics();
    await logout();
    window.location = "/login";
  };

  return <Box {...props} onClick={handleLogout} />;
}
