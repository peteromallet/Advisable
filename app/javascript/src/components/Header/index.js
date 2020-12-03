// Renders the primary header for the app
import React, { Fragment } from "react";
import { gql, useMutation } from "@apollo/client";
import { Header as Wrapper, Spacer, Logo, Hamburger, Login } from "./styles";
import logo from "./logo.svg";
import CurrentUser from "./CurrentUser";
import { useMobile } from "src/components/Breakpoint";
import AnonymousNavigation from "./AnonymousNavigation";
import ClientNavigation from "./ClientNavigation";
import FreelancerNavigation from "./FreelancerNavigation";
import useLogoURL from "../ApplicationProvider/useLogoURL";
import useViewer from "src/hooks/useViewer";

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
            <img src={logo} alt="" />
          </Logo>
          {viewer && viewer.isClient && (
            <ClientNavigation
              navOpen={navOpen}
              onCloseNav={() => setNavOpen(false)}
              onLogout={() => handleLogout()}
            />
          )}
          {viewer && viewer.isSpecialist && (
            <FreelancerNavigation
              navOpen={navOpen}
              onLogout={() => handleLogout()}
              onCloseNav={() => setNavOpen(false)}
            />
          )}
          {!viewer && (
            <AnonymousNavigation
              onCloseNav={() => setNavOpen(false)}
              navOpen={navOpen}
            />
          )}
          {viewer && !isMobile && (
            <CurrentUser user={viewer} onLogout={() => handleLogout()} />
          )}
          {!viewer && !isMobile && <Login to="/login">Login</Login>}
        </React.Fragment>
      </Wrapper>
    </Fragment>
  );
};

export default Header;
