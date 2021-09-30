import * as React from "react";
import NavigationLink from "./NavigationLink";
import { StyledNav } from "./styles";

const AnonymousNavigation = ({ onCloseNav, isMobile }) => {
  return (
    <StyledNav>
      {isMobile && (
        <NavigationLink onClick={onCloseNav} to="/login">
          Login
        </NavigationLink>
      )}
    </StyledNav>
  );
};

export default AnonymousNavigation;
