import React from "react";
import NavigationLink from "./NavigationLink";
import MessageCount from "./MessageCount";
import { StyledNav } from "./styles";
import Logout from "./Logout";

const FreelancerNavigation = ({ closeNav, isMobile }) => {
  return (
    <StyledNav>
      <NavigationLink onClick={closeNav} to="/applications">
        Applications
      </NavigationLink>
      <NavigationLink onClick={closeNav} to="/clients">
        Projects
      </NavigationLink>
      <NavigationLink
        prefix={<MessageCount />}
        onClick={closeNav}
        to="/messages"
      >
        Messages
      </NavigationLink>
      <NavigationLink onClick={closeNav} to="/guild">
        Guild
      </NavigationLink>
      <NavigationLink onClick={closeNav} to="/events">
        Events
      </NavigationLink>

      {isMobile && (
        <>
          <NavigationLink as="a" href="/settings">
            Settings
          </NavigationLink>
          <NavigationLink as={Logout}>Logout</NavigationLink>
        </>
      )}
    </StyledNav>
  );
};

export default FreelancerNavigation;
