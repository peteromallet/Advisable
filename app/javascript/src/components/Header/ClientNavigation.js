import * as React from "react";
import useFeatureFlag from "src/hooks/useFeatureFlag";
import MessageCount from "./MessageCount";
import NavigationLink from "./NavigationLink";
import Logout from "./Logout";
import { StyledNav } from "./styles";

const ClientNavigation = ({ closeNav, isMobile }) => {
  const isCaseStudiesEnabled = useFeatureFlag("case_studies");

  return (
    <StyledNav>
      {isCaseStudiesEnabled && (
        <NavigationLink onClick={closeNav} to="/explore">
          Discover
        </NavigationLink>
      )}
      <NavigationLink onClick={closeNav} to="/projects">
        Hire
      </NavigationLink>
      <NavigationLink onClick={closeNav} to="/manage">
        Manage
      </NavigationLink>
      <NavigationLink onClick={closeNav} to="/messages">
        <MessageCount />
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
