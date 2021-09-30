import * as React from "react";
import { X } from "@styled-icons/feather/X";
import { useMobile } from "../../components/Breakpoint";
import { CloseNav, NavContainer, Nav } from "./styles";
import useFeatureFlag from "src/hooks/useFeatureFlag";
import MessageCount from "./MessageCount";
import NavigationLink from "./NavigationLink";

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
          <NavigationLink onClick={onCloseNav} to="/explore">
            Explore
          </NavigationLink>
        )}
        <NavigationLink onClick={onCloseNav} to="/projects">
          Hire
        </NavigationLink>
        <NavigationLink onClick={onCloseNav} to="/manage">
          Manage
        </NavigationLink>
        <NavigationLink onClick={onCloseNav} to="/messages">
          <MessageCount />
          Messages
        </NavigationLink>

        {isMobile && (
          <NavigationLink as="a" href="#" onClick={onLogout}>
            Logout
          </NavigationLink>
        )}
      </Nav>
    </NavContainer>
  );
};

export default ClientNavigation;
