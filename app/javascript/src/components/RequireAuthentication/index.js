import React from "react";
import { Redirect, useLocation } from "react-router-dom";
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

function RequireAuthentication({ children, specialistOnly, clientOnly }) {
  const viewer = useViewer();

  if (specialistOnly && viewer && !viewer.isSpecialist) {
    return <Redirect to="/" />;
  }

  if (clientOnly && viewer && !viewer.isClient) {
    return <Redirect to="/" />;
  }

  return viewer ? children : <RedirectToLogin />;
}

export default RequireAuthentication;
