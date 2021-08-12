import * as React from "react";
import { X } from "@styled-icons/feather/X";
import { useMobile } from "../../components/Breakpoint";
import { CloseNav, NavContainer, Nav, NavItem } from "./styles";
import useFeatureFlag from "src/hooks/useFeatureFlag";
import MessageCount from "./MessageCount";

const ClientNavigation = ({ navOpen, onCloseNav, onLogout }) => {
  const isMobile = useMobile();
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
        <NavItem onClick={onCloseNav} to="/messages">
          <MessageCount />
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
