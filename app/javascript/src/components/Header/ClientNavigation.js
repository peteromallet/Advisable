import * as React from "react";
import MessageCount from "./MessageCount";
import NavigationLink from "./NavigationLink";
import Logout from "./Logout";
import { StyledNav, NavItem } from "./styles";

const ClientNavigation = ({ closeNav, isMobile }) => {
  return (
    <StyledNav>
      <NavigationLink onClick={closeNav} to="/">
        Discover
      </NavigationLink>
      <NavigationLink onClick={closeNav} to="/payment_requests">
        Payments
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
          <NavItem as="a" href="/settings">
            Settings
          </NavItem>
          <NavItem as={Logout}>Logout</NavItem>
        </>
      )}
    </StyledNav>
  );
};

export default ClientNavigation;
