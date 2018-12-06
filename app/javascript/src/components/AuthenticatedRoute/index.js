// Similar to the Route component from reach component but requires an
// authenticated user to view the route. If the viewer is not authenticated it
// will redirect to the Login view.

import React from "react";
import { Query } from "react-apollo";
import { Route, Redirect } from "react-router-dom";
import Loading from "../Loading";
import VIEWER from "./viewer.graphql";
import PendingConfirmation from "./PendingConfirmation";

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      // If there is no authToken in storage then redirect immediately
      if (!localStorage.getItem("authToken")) {
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

            if (viewer && !viewer.confirmed) {
              return <PendingConfirmation viewer={viewer} />;
            }

            if (viewer && viewer.confirmed) return <Component {...props} />;

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
