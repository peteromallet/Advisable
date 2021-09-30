import * as React from "react";
import { X } from "@styled-icons/feather/X";
import { useMobile } from "../../components/Breakpoint";
import { CloseNav, NavContainer, Nav } from "./styles";
import NavigationLink from "./NavigationLink";

const AnonymousNavigation = ({ navOpen, onCloseNav }) => {
  const isMobile = useMobile();

  return (
    <NavContainer isOpen={navOpen}>
      <Nav>
        <CloseNav onClick={onCloseNav}>
          <X />
        </CloseNav>
        {isMobile && (
          <NavigationLink onClick={onCloseNav} to="/login">
            Login
          </NavigationLink>
        )}
      </Nav>
    </NavContainer>
  );
};

export default AnonymousNavigation;
