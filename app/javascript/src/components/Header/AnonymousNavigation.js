import * as React from "react";
import { X } from "@styled-icons/feather/X";
import { useMobile } from "../../components/Breakpoint";
import { CloseNav, NavContainer, Nav, NavItem } from "./styles";

const AnonymousNavigation = ({ navOpen, onCloseNav }) => {
  const isMobile = useMobile();

  return (
    <NavContainer isOpen={navOpen}>
      <Nav>
        <CloseNav onClick={onCloseNav}>
          <X />
        </CloseNav>
        {isMobile && (
          <NavItem onClick={onCloseNav} to="/login">
            Login
          </NavItem>
        )}
      </Nav>
    </NavContainer>
  );
};

export default AnonymousNavigation;
