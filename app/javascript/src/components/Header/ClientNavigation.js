import * as React from "react";
import { X } from "@styled-icons/feather/X";
import { useMobile } from "../../components/Breakpoint";
import useMessageCount from "../../hooks/useMessageCount";
import { CloseNav, NavContainer, Nav, NavItem, Badge } from "./styles";
import useFeatureFlag from "src/hooks/useFeatureFlag";

const ClientNavigation = ({ navOpen, onCloseNav, onLogout }) => {
  const isMobile = useMobile();
  const messageCount = useMessageCount();
  const isCaseStudiesEnabled = useFeatureFlag("case_studies");

  return (
    <NavContainer isOpen={navOpen}>
      <Nav>
        <CloseNav onClick={onCloseNav}>
          <X />
        </CloseNav>
        {isCaseStudiesEnabled && (
          <NavItem onClick={onCloseNav} to="/explore">
            Explore
          </NavItem>
        )}
        <NavItem onClick={onCloseNav} to="/projects">
          Hire
        </NavItem>
        <NavItem onClick={onCloseNav} to="/manage">
          Manage
        </NavItem>
        <NavItem onClick={onCloseNav} to="/new_messages">
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

export default ClientNavigation;
