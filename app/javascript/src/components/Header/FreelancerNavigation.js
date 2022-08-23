import React from "react";
import NavigationLink from "./NavigationLink";
import MessageCount from "./MessageCount";
import { StyledNav, NavItem } from "./styles";
import Logout from "./Logout";

const FreelancerNavigation = ({ closeNav, isMobile }) => {
  return (
    <StyledNav>
      <NavigationLink onClick={closeNav} to="/" exact>
        Dashboard
      </NavigationLink>
      <NavigationLink onClick={closeNav} to="/payment_requests">
        Payments
      </NavigationLink>
      <NavigationLink onClick={closeNav} to="/profile">
        Profile
      </NavigationLink>

      {isMobile && (
        <>
          <NavigationLink
            prefix={<MessageCount />}
            onClick={closeNav}
            to="/messages"
          >
            Messages
          </NavigationLink>
          <NavItem as="a" href="/settings">
            Settings
          </NavItem>
          <NavItem as={Logout}>Logout</NavItem>
        </>
      )}
    </StyledNav>
  );
};

export default FreelancerNavigation;
