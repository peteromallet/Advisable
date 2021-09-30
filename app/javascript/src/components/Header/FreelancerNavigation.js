import React from "react";
import { X } from "@styled-icons/feather/X";
import { useMobile } from "../../components/Breakpoint";
import { CloseNav, NavContainer, Nav } from "./styles";
import NavigationLink from "./NavigationLink";
import MessageCount from "./MessageCount";

const FreelancerNavigation = ({ navOpen, onCloseNav, onLogout }) => {
  const isMobile = useMobile();

  return (
    <NavContainer isOpen={navOpen}>
      <Nav>
        <CloseNav onClick={onCloseNav}>
          <X />
        </CloseNav>
        <NavigationLink onClick={onCloseNav} to="/applications">
          Applications
        </NavigationLink>
        <NavigationLink onClick={onCloseNav} to="/clients">
          Active Projects
        </NavigationLink>
        <NavigationLink onClick={onCloseNav} to="/messages">
          <MessageCount />
          Messages
        </NavigationLink>
        <NavigationLink onClick={onCloseNav} to="/guild">
          Guild
        </NavigationLink>
        <NavigationLink onClick={onCloseNav} to="/events">
          Events
        </NavigationLink>

        {isMobile && (
          <>
            <NavigationLink as="a" href="/settings">
              Settings
            </NavigationLink>
            <NavigationLink as="a" href="#" onClick={onLogout}>
              Logout
            </NavigationLink>
          </>
        )}
      </Nav>
    </NavContainer>
  );
};

export default FreelancerNavigation;
