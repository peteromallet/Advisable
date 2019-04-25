import * as React from "react";
import Icon from "../Icon";
import { useMobile } from "../../components/Breakpoint";
import { CloseNav, NavContainer, Nav, NavItem } from "./styles";

const FreelancerNavigation = ({ data, navOpen, onCloseNav, onLogout }) => {
  const isMobile = useMobile();
  const { viewer } = data;
  const isUser = viewer && viewer.__typename === "User";

  if (!isUser) return null;

  return (
    <NavContainer isOpen={navOpen}>
      <Nav>
        <CloseNav onClick={onCloseNav}>
          <Icon icon="x" />
        </CloseNav>
        <NavItem onClick={onCloseNav} to="/projects">
          Find Talent
        </NavItem>
        <NavItem onClick={onCloseNav} to="/manage">
          Manage Talent
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
