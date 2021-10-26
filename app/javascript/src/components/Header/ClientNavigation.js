import * as React from "react";
import MessageCount from "./MessageCount";
import NavigationLink from "./NavigationLink";
import Logout from "./Logout";
import { StyledNav } from "./styles";

const ClientNavigation = ({ closeNav, isMobile }) => {
  return (
    <StyledNav>
      <NavigationLink onClick={closeNav} to="/explore">
        Discover
      </NavigationLink>
      <NavigationLink onClick={closeNav} to="/hire">
        Hire
      </NavigationLink>
      <NavigationLink onClick={closeNav} to="/manage">
        Manage
      </NavigationLink>
      <NavigationLink
        prefix={<MessageCount />}
        onClick={closeNav}
        to="/messages"
      >
        Messages
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

export default ClientNavigation;
