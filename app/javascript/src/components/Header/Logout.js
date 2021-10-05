import React from "react";
import { Box } from "@advisable/donut";
import { gql, useMutation } from "@apollo/client";

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
    await logout();
    window.location = "/login";
  };

  return <Box {...props} onClick={handleLogout} />;
}
