import * as React from "react";
import NavigationLink from "./NavigationLink";
import { StyledNav } from "./styles";

const AnonymousNavigation = ({ closeNav, isMobile }) => {
  return (
    <StyledNav>
      {isMobile && (
        <NavigationLink onClick={closeNav} to="/login">
          Login
        </NavigationLink>
      )}
    </StyledNav>
  );
};

export default AnonymousNavigation;
