// Renders the primary header for the app
import { withRouter } from "react-router-dom";
import React from "react";
import { Header as Wrapper, Spacer, Logo, Hamburger } from "./styles";
import logo from "./logo.svg";
import CurrentUser from "./CurrentUser";
import { useMobile } from "../../components/Breakpoint";
import ClientNavigation from "./ClientNavigation";
import FreelancerNavigation from "./FreelancerNavigation";

const Header = () => {
  const isMobile = useMobile();
  const [navOpen, setNavOpen] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    window.location = "/login";
  };

  return (
    <>
      <Spacer />
      <Wrapper>
        <Hamburger onClick={() => setNavOpen(true)}>
          <div />
          <div />
          <div />
        </Hamburger>
        <Logo to="/">
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
        {!isMobile && <CurrentUser onLogout={() => handleLogout()} />}
      </Wrapper>
    </>
  );
};

export default withRouter(Header);
