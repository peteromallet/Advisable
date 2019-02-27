import * as React from "react";
import { Query } from "react-apollo";
import VIEWER from "../../graphql/viewer.graphql";
import { Nav, NavItem } from "./styles";

const FreelancerNavigation = () => {
  return (
    <Query query={VIEWER}>
      {query => {
        if (query.loading) return null;
        const { viewer } = query.data;
        const isSpecialist = viewer && viewer.__typename === 'Specialist'

        if (!isSpecialist) return null

        return (
          <Nav>
            <NavItem to="/applications">Applications</NavItem>
            <NavItem to="/profile">Profile</NavItem>
          </Nav>
        );
      }}
    </Query>
  );
};

export default FreelancerNavigation;
