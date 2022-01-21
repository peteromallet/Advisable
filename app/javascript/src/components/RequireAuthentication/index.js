import React, { lazy } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useViewer from "../../hooks/useViewer";
const SetPassword = lazy(() => import("src/views/SetPassword"));

function RedirectToLogin() {
  const location = useLocation();

  return <Navigate to="/login" state={{ from: location }} />;
}

function RequireAuthentication({ children, specialistOnly, clientOnly }) {
  const viewer = useViewer();

  if (specialistOnly && viewer && !viewer.isSpecialist) {
    return <Navigate to="/" />;
  }

  if (clientOnly && viewer && !viewer.isClient) {
    return <Navigate to="/" />;
  }

  if (viewer?.needsToSetAPassword) {
    return <SetPassword />;
  }

  return viewer ? children : <RedirectToLogin />;
}

export default RequireAuthentication;
