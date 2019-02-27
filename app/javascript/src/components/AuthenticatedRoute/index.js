// Similar to the Route component from reach component but requires an
// authenticated user to view the route. If the viewer is not authenticated it
// will redirect to the Login view.
import React from "react";
import { Query } from "react-apollo";
import { Route, Redirect } from "react-router-dom";
import Loading from "../Loading";
import VIEWER from "./viewer.graphql";
import PendingConfirmation from "./PendingConfirmation";

const AuthenticatedRoute = ({ render, component: Component, freelancerRoute, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const token =
        sessionStorage.getItem("authToken") ||
        localStorage.getItem("authToken");
      // If there is no authToken in storage then redirect immediately
      if (!token) {
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        );
      }

      // Query for the viewer to ensure their token is valid
      return (
        <Query query={VIEWER}>
          {query => {
            if (query.loading) return <Loading />;
            const viewer = query.data.viewer;
            const isSpecialist = viewer && viewer.__typename === 'Specialist';

            // If there is no viewer then remove any authToken and redirect to
            // the login page
            if (!viewer) {
              window.sessionStorage.removeItem("authToken");
              window.localStorage.removeItem("authToken");

              return (
                <Redirect
                  to={{
                    pathname: "/login",
                    state: { from: props.location }
                  }}
                />
              );
            }

            // if this is a freelancer route and the viewer is a user then
            // redirect back to the root path.
            if (freelancerRoute && !isSpecialist && rest.path !== "/") {
              return <Redirect to="/" />
            }

            // if this is not a freelancer route and a freelancer is logged in
            // then redirect to the root path.
            if (!freelancerRoute && isSpecialist && rest.path !== "/") {
              return <Redirect to="/" />
            }

            // If the viewer is a user.
            if (viewer.__typename === "User") {
              // if the client has not setup their account.
              if (rest.path !== "/setup" && viewer.setupRequired && !viewer.confirmed) {
                return <Redirect to="/setup" />;
              }

              // if the client has not confirmed their account then show the
              // confirmation pending page.
              if (viewer && !viewer.confirmed) {
                return <PendingConfirmation viewer={viewer} />;
              }
            }

            return Component ? <Component {...props} /> : render(props);
          }}
        </Query>
      );
    }}
  />
);

export default AuthenticatedRoute;