// Renders the primary header for the app
import { Query } from "react-apollo";
import React, { Fragment } from "react";
import { Header, Spacer, Logo, Hamburger } from "./styles";
import logo from "./logo.svg";
import CurrentUser from "./CurrentUser";
import { useMobile } from "../../components/Breakpoint";
import ClientNavigation from "./ClientNavigation";
import FreelancerNavigation from "./FreelancerNavigation";
import VIEWER from "../AuthenticatedRoute/viewer.graphql";

export default () => {
  const isMobile = useMobile();
  const [navOpen, setNavOpen] = React.useState(false);

  const handleLogout = apolloClient => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    apolloClient.resetStore();
  };

  return (
    <Fragment>
      <Spacer />
      <Header>
        <Query query={VIEWER}>
          {query => (
            <React.Fragment>
              <Hamburger onClick={() => setNavOpen(true)}>
                <div />
                <div />
                <div />
              </Hamburger>
              <Logo to="/">
                <img src={logo} alt="" />
              </Logo>
              <ClientNavigation
                data={query.data}
                navOpen={navOpen}
                onCloseNav={() => setNavOpen(false)}
                onLogout={() => handleLogout(query.client)}
              />
              <FreelancerNavigation
                navOpen={navOpen}
                onLogout={() => handleLogout(query.client)}
                onCloseNav={() => setNavOpen(false)}
              />
              {!isMobile && !query.loading && (
                <CurrentUser
                  user={query.data.viewer}
                  onLogout={() => handleLogout(query.client)}
                />
              )}
            </React.Fragment>
          )}
        </Query>
      </Header>
    </Fragment>
  );
};
