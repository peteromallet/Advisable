import React from "react";
import NavigationLink from "./NavigationLink";
import MessageCount from "./MessageCount";
import { StyledNav } from "./styles";

const FreelancerNavigation = ({ onCloseNav, onLogout, isMobile }) => {
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
          <NavigationLink as="a" href="#" onClick={onLogout}>
            Logout
          </NavigationLink>
        </>
      )}
    </StyledNav>
  );
};

export default FreelancerNavigation;
