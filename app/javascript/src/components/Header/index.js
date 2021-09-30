// Renders the primary header for the app
import React from "react";
import { gql, useMutation } from "@apollo/client";
import { StyledHeader, Logo, Hamburger, Login } from "./styles";
import CurrentUser from "./CurrentUser";
import { Box } from "@advisable/donut";
import { useMobile } from "src/components/Breakpoint";
import AnonymousNavigation from "./AnonymousNavigation";
import ClientNavigation from "./ClientNavigation";
import FreelancerNavigation from "./FreelancerNavigation";
import useLogoURL from "../ApplicationProvider/useLogoURL";
import useViewer from "src/hooks/useViewer";
import LogoMark from "src/components/LogoMark";
import Notifications from "./Notifications";

const LOGOUT = gql`
  mutation logout($input: LogoutInput!) {
    logout(input: $input) {
      success
    }
  }
`;

const Header = () => {
  const viewer = useViewer();
  const isMobile = useMobile();
  const [logout] = useMutation(LOGOUT, { variables: { input: {} } });
  const [navOpen, setNavOpen] = React.useState(false);
  const logoURL = useLogoURL();

  const handleLogout = async () => {
    await logout();
    window.location = "/login";
  };

  return (
    <StyledHeader>
      <Box>
        <Logo href={logoURL}>
          <LogoMark size={24} />
        </Logo>
        <Hamburger onClick={() => setNavOpen(true)}>
          <div />
          <div />
          <div />
        </Hamburger>
      </Box>
      <Box flexGrow={1}>
        {viewer && viewer.isClient && viewer.isAccepted && (
          <ClientNavigation
            navOpen={navOpen}
            onCloseNav={() => setNavOpen(false)}
            onLogout={handleLogout}
          />
        )}
        {viewer && viewer.isSpecialist && viewer.isAccepted && (
          <FreelancerNavigation
            navOpen={navOpen}
            onLogout={handleLogout}
            onCloseNav={() => setNavOpen(false)}
          />
        )}
        {!viewer && (
          <AnonymousNavigation
            onCloseNav={() => setNavOpen(false)}
            navOpen={navOpen}
          />
        )}
      </Box>
      <Box display="flex" alignItems="center" css="gap: 8px;">
        {viewer?.isSpecialist && <Notifications />}
        {viewer && !isMobile && (
          <CurrentUser user={viewer} onLogout={handleLogout} />
        )}
        {!viewer && !isMobile && <Login to="/login">Login</Login>}
      </Box>
    </StyledHeader>
  );
};

export default Header;
