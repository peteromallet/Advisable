import * as React from "react";
import Icon from "../Icon";
import { useMobile } from "../../components/Breakpoint";
import useMessageCount from "../../hooks/useMessageCount";
import { CloseNav, NavContainer, Nav, NavItem, Badge } from "./styles";

const FreelancerNavigation = ({ data, navOpen, onCloseNav, onLogout }) => {
  const isMobile = useMobile();
  const messageCount = useMessageCount();
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
