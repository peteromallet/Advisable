import * as React from "react";
import { Query } from "react-apollo";
import Icon from "../Icon";
import { useMobile } from "../../components/Breakpoint";
import VIEWER from "../../graphql/viewer.graphql";
import { CloseNav, NavContainer, Nav, NavItem } from "./styles";

const FreelancerNavigation = ({ navOpen, onCloseNav, onLogout }) => {
  const isMobile = useMobile();

  return (
    <Query query={VIEWER}>
      {query => {
        if (query.loading) return null;
        const { viewer } = query.data;
        const isSpecialist = viewer && viewer.__typename === "Specialist";

        if (!isSpecialist) return null;

        return (
          <NavContainer isOpen={navOpen}>
            <Nav>
              <CloseNav onClick={onCloseNav}>
                <Icon icon="x" />
              </CloseNav>
              <NavItem onClick={onCloseNav} to="/applications">Applications</NavItem>
              <NavItem onClick={onCloseNav} to="/clients">Active Projects</NavItem>
              <NavItem onClick={onCloseNav} to="/profile">Profile</NavItem>

              {isMobile && (
                <NavItem as="a" href="#" onClick={onLogout}>
                  Logout
                </NavItem>
              )}
            </Nav>
          </NavContainer>
        );
      }}
    </Query>
  );
};

export default FreelancerNavigation;
