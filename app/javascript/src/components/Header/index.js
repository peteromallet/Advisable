// Renders the primary header for the app
import { withRouter } from "react-router-dom";
import React, { Fragment } from "react";
import { Header as Wrapper, Spacer, Logo, Hamburger } from "./styles";
import logo from "./logo.svg";
import CurrentUser from "./CurrentUser";
import { useMobile } from "../../components/Breakpoint";
import ClientNavigation from "./ClientNavigation";
import FreelancerNavigation from "./FreelancerNavigation";
import useLogoURL from "../ApplicationProvider/useLogoURL";
import useViewer from "../../hooks/useViewer";

const Header = (props) => {
  const viewer = useViewer();
  const isMobile = useMobile();
  const [navOpen, setNavOpen] = React.useState(false);
  const logoURL = useLogoURL();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
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
          <ClientNavigation
            navOpen={navOpen}
            onCloseNav={() => setNavOpen(false)}
            onLogout={() => handleLogout()}
          />
          <FreelancerNavigation
            navOpen={navOpen}
            onLogout={() => handleLogout()}
            onCloseNav={() => setNavOpen(false)}
          />
          {!isMobile && (
            <CurrentUser user={viewer} onLogout={() => handleLogout()} />
          )}
        </React.Fragment>
      </Wrapper>
    </Fragment>
  );
};

export default withRouter(Header);
