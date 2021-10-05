import React from "react";
import NavigationLink from "./NavigationLink";
import MessageCount from "./MessageCount";
import { StyledNav } from "./styles";
import Logout from "./Logout";

const FreelancerNavigation = ({ onCloseNav, isMobile }) => {
  return (
    <StyledNav>
      <NavigationLink onClick={onCloseNav} to="/applications">
        Applications
      </NavigationLink>
      <NavigationLink onClick={onCloseNav} to="/clients">
        Projects
      </NavigationLink>
      <NavigationLink
        prefix={<MessageCount />}
        onClick={onCloseNav}
        to="/messages"
      >
        <MessageCount />
        Messages
      </NavigationLink>
      <NavigationLink onClick={onCloseNav} to="/guild">
        Guild
      </NavigationLink>
      <NavigationLink onClick={onCloseNav} to="/events">
        Events
      </NavigationLink>

      {isMobile && (
        <>
          <NavigationLink as="a" href="/settings">
            Settings
          </NavigationLink>
          <NavigationLink as={Logout}>Logout</NavigationLink>
          {/* <Logout as="a">Logout</Logout> */}
        </>
      )}
    </StyledNav>
  );
};

export default FreelancerNavigation;
