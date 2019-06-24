// Similar to the Route component from reach component but requires an
// authenticated user to view the route. If the viewer is not authenticated it
// will redirect to the Login view.
// You can use the as prop to determine which type of viewer should be logged
// in. The value for this prop should correspond direclty with the graphql
// __typename attribute of the viewer. e.g "User" or "Specialist". Without this
// prop the component will simply check there is a viewer.
import React from "react";
import { Route, Redirect } from "react-router-dom";
import PendingConfirmation from "./PendingConfirmation";
import useViewer from "../../hooks/useViewer";

const AuthenticatedRoute = ({
  as,
  render,
  component: Component,
  freelancerRoute,
  ...rest
}) => {
  const viewer = useViewer();

  return (
    <Route
      {...rest}
      render={props => {
        // If there is no user then clear out any token and redirect immediately
        if (!viewer) {
          window.sessionStorage.removeItem("authToken");
          window.localStorage.removeItem("authToken");

          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        }

        // If the "as" prop was passed then make sure the viewer it the correct
        // type otherwhise redirect to the apex route.
        if (as && as !== viewer.__typename) {
          return <Redirect to="/" />;
        }

        // if the viewer still needs to confirm their account then render the
        // confirmation view.
        if (!viewer.confirmed) {
          return <PendingConfirmation viewer={viewer} />;
        }

        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default AuthenticatedRoute;
