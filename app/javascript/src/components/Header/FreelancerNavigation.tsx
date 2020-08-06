import * as React from "react";
import { X } from "@styled-icons/feather";
import { useMobile } from "../../components/Breakpoint";
import useMessageCount from "../../hooks/useMessageCount";
import { CloseNav, NavContainer, Nav, NavItem, Badge } from "./styles";

const FreelancerNavigation = ({ navOpen, onCloseNav, onLogout }) => {
  const isMobile = useMobile();
  const messageCount = useMessageCount();

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
        <NavItem onClick={onCloseNav} to="/profile">
          Profile
        </NavItem>
        <NavItem onClick={onCloseNav} to="/messages">
          {messageCount > 0 && <Badge>{messageCount}</Badge>}
          Messages
        </NavItem>

        {isMobile && (
          <NavItem as="a" href="#" onClick={onLogout}>
            Logout
          </NavItem>
        )}
      </Nav>
    </NavContainer>
  );
};

export default FreelancerNavigation;
