import * as React from "react";
import Icon from "../Icon";
import { useMobile } from "../../components/Breakpoint";
import useViewer from "../../hooks/useViewer";
import useMessageCount from "../../hooks/useMessageCount";
import { CloseNav, NavContainer, Nav, NavItem, Badge } from "./styles";

const FreelancerNavigation = ({ navOpen, onCloseNav, onLogout }) => {
  const viewer = useViewer();
  const isMobile = useMobile();
  const messageCount = useMessageCount();

  const isSpecialist = viewer && viewer.__typename === "Specialist";

  if (!isSpecialist) return null;

  return (
    <NavContainer isOpen={navOpen}>
      <Nav>
        <CloseNav onClick={onCloseNav}>
          <Icon icon="x" />
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
