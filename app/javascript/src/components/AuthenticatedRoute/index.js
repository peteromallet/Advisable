// Similar to the Route component from reach component but requires an
// authenticated user to view the route. If the viewer is not authenticated it
// will redirect to the Login view.
import React from "react";
import { Redirect, useLocation } from "react-router-dom";
import Route from "src/components/Route";
import useViewer from "../../hooks/useViewer";

function RedirectToLogin() {
  const location = useLocation();

  return (
    <Redirect
      to={{
        pathname: "/login",
        state: { from: location },
      }}
    />
  );
}

const AuthenticatedRoute = ({
  specialistOnly = false,
  clientOnly = false,
  children,
  ...props
}) => {
  const viewer = useViewer();
  const __typename = viewer?.__typename;

  if (specialistOnly && viewer && __typename !== "Specialist") {
    return <Redirect to="/" />;
  }

  if (clientOnly && viewer && __typename !== "User") {
    return <Redirect to="/" />;
  }

  return (
    <Route {...props}>
      {viewer ? React.cloneElement(children) : <RedirectToLogin />}
    </Route>
  );
};

export default AuthenticatedRoute;
