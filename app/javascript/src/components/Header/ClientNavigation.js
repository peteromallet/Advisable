import * as React from "react";
import Icon from "../Icon";
import useViewer from "../../hooks/useViewer";
import { useMobile } from "../../components/Breakpoint";
import useMessageCount from "../../hooks/useMessageCount";
import { CloseNav, NavContainer, Nav, NavItem, Badge } from "./styles";

const ClientNavigation = ({ navOpen, onCloseNav, onLogout }) => {
  const viewer = useViewer();
  const isMobile = useMobile();
  const messageCount = useMessageCount();

  if (!viewer?.isClient) return null;

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

export default ClientNavigation;
