// Similar to the Route component from reach component but requires an
// authenticated user to view the route. If the viewer is not authenticated it
// will redirect to the Login view.

import React from "react";
import { Query } from "react-apollo";
import { Route, Redirect } from "react-router-dom";
import Loading from "../Loading";
import VIEWER from "./viewer.graphql";
import PendingConfirmation from "./PendingConfirmation";

const AuthenticatedRoute = ({ render, component: Component, ...rest }) => (
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

            if (rest.path !== "/setup" && viewer && viewer.setupRequired) {
              return <Redirect to="/setup" />;
            }

            if (viewer && !viewer.confirmed) {
              return <PendingConfirmation viewer={viewer} />;
            }

            if (viewer && viewer.confirmed) {
              return Component ? <Component {...props} /> : render(props);
            }

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
          }}
        </Query>
      );
    }}
  />
);

export default AuthenticatedRoute;
