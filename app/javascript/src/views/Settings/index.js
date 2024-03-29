import React, { lazy } from "react";
import useViewer from "../../hooks/useViewer";
const ClientSettings = lazy(() => import("./ClientSettings"));
const SpecialistSettings = lazy(() => import("./SpecialistSettings"));

// Renders the settings page for the current user. This component will load
// either ClientSettings or FreelancerSettings depending on which type of
// user is logged in.
const Settings = (props) => {
  let viewer = useViewer();
  let isClient = viewer.__typename === "User";

  if (isClient) {
    return <ClientSettings {...props} />;
  }

  return <SpecialistSettings {...props} />;
};

export default Settings;
