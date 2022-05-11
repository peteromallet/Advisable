import React from "react";
import { gql, useMutation } from "@apollo/client";
import { resetAnalytics } from "src/utilities/segment";
import { StyledDropdownLink } from "./styles";

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

  return (
    <StyledDropdownLink as="a" href="#" {...props} onClick={handleLogout} />
  );
}
