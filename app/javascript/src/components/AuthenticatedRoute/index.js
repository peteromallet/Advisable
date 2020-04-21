// Similar to the Route component from reach component but requires an
// authenticated user to view the route. If the viewer is not authenticated it
// will redirect to the Login view.
import React from "react";
import { get } from "lodash-es";
import { Route, Redirect } from "react-router-dom";
import PendingConfirmation from "./PendingConfirmation";
import useViewer from "../../hooks/useViewer";

const AuthenticatedRoute = ({
  render,
  component: Component,
  specialistOnly = false,
  clientOnly = false,
  ...rest
}) => {
  const viewer = useViewer();
  const __typename = get(viewer, "__typename");
  const applicationStage = get(viewer, "applicationStage");

  if (specialistOnly && __typename !== "Specialist") {
    return <Redirect to="/" />;
  }

  if (clientOnly && __typename !== "User") {
    return <Redirect to="/" />;
  }

  return (
    <Route
      {...rest}
      render={(props) => {
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

        // Redirect to specialist setup if their applicationStage is 'Started'
        if (__typename === "Specialist" && applicationStage === "Started") {
          return <Redirect to="/freelancers/signup/preferences" />;
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
