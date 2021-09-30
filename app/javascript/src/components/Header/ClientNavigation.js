import * as React from "react";
import useFeatureFlag from "src/hooks/useFeatureFlag";
import MessageCount from "./MessageCount";
import NavigationLink from "./NavigationLink";
import Logout from "./Logout";
import { StyledNav } from "./styles";

const ClientNavigation = ({ onCloseNav, isMobile }) => {
  const isCaseStudiesEnabled = useFeatureFlag("case_studies");

  return (
    <StyledNav>
      {isCaseStudiesEnabled && (
        <NavigationLink onClick={onCloseNav} to="/explore">
          Explore
        </NavigationLink>
      )}
      <NavigationLink onClick={onCloseNav} to="/projects">
        Hire
      </NavigationLink>
      <NavigationLink onClick={onCloseNav} to="/manage">
        Manage
      </NavigationLink>
      <NavigationLink onClick={onCloseNav} to="/messages">
        <MessageCount />
        Messages
      </NavigationLink>

      {isMobile && <Logout as="a">Logout</Logout>}
    </StyledNav>
  );
};

export default ClientNavigation;
