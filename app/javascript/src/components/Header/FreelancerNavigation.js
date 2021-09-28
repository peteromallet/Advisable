import React from "react";
import { X } from "@styled-icons/feather/X";
import { useMobile } from "../../components/Breakpoint";
import { CloseNav, NavContainer, Nav, NavItem } from "./styles";
import MessageCount from "./MessageCount";

const FreelancerNavigation = ({ navOpen, onCloseNav, onLogout }) => {
  const isMobile = useMobile();

  return (
    <NavContainer isOpen={navOpen}>
      <Nav>
        <CloseNav onClick={onCloseNav}>
          <X />
        </CloseNav>
        <NavItem onClick={onCloseNav} to="/applications">
          Applications
        </NavItem>
        <NavItem onClick={onCloseNav} to="/clients">
          Active Projects
        </NavItem>
        <NavItem onClick={onCloseNav} to="/messages">
          <MessageCount />
          Messages
        </NavItem>
        <NavItem onClick={onCloseNav} to="/guild">
          Guild
        </NavItem>
        <NavItem onClick={onCloseNav} to="/events">
          Events
        </NavItem>

        {isMobile && (
          <>
            <NavItem as="a" href="/settings">
              Settings
            </NavItem>
            <NavItem as="a" href="#" onClick={onLogout}>
              Logout
            </NavItem>
          </>
        )}
      </Nav>
    </NavContainer>
  );
};

export default FreelancerNavigation;
