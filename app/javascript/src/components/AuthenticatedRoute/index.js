// Similar to the Route component from reach component but requires an
// authenticated user to view the route. If the viewer is not authenticated it
// will redirect to the Login view.
import React from "react";
import { Route, Redirect } from "react-router-dom";
import useViewer from "../../hooks/useViewer";

const AuthenticatedRoute = ({
  render,
  component: Component,
  specialistOnly = false,
  clientOnly = false,
  ...rest
}) => {
  const viewer = useViewer();
  const __typename = viewer?.__typename;
  const applicationStage = viewer?.applicationStage;

  if (specialistOnly && viewer && __typename !== "Specialist") {
    return <Redirect to="/" />;
  }

  if (clientOnly && viewer && __typename !== "User") {
    return <Redirect to="/" />;
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!viewer) {
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

        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default AuthenticatedRoute;
