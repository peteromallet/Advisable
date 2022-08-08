import React from "react";
import { StyledDropdownLink } from "./styles";
import { useLogout } from "src/graphql/mutations";

export default function Logout(props) {
  const logout = useLogout();

  return (
    <StyledDropdownLink as="a" href="#" {...props} onClick={logout} />
  );
}
