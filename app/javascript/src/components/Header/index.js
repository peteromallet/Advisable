// Renders the primary header for the app
import React, { Fragment } from "react";
import { gql, useMutation } from "@apollo/client";
import { Header as Wrapper, Spacer, Logo, Hamburger, Login } from "./styles";
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
    <Fragment>
      <Spacer />
      <Wrapper>
        <React.Fragment>
          <Hamburger onClick={() => setNavOpen(true)}>
            <div />
            <div />
            <div />
          </Hamburger>
          <Logo href={logoURL}>
            <LogoMark color="white" size={24} />
          </Logo>
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
          <Box
            position="absolute"
            right="25px"
            display="flex"
            alignItems="center"
          >
            {viewer?.isSpecialist && <Notifications />}
            {viewer && !isMobile && (
              <CurrentUser user={viewer} onLogout={handleLogout} />
            )}
            {!viewer && !isMobile && <Login to="/login">Login</Login>}
          </Box>
        </React.Fragment>
      </Wrapper>
    </Fragment>
  );
};

export default Header;
