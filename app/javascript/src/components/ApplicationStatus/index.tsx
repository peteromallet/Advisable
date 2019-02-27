// Renders the status for a given application. The colour of the status is
// dependent of the application status.

import * as React from "react";
import Status from "../Status";

const ApplicationStatus = ({ children }) => {
  return (
    <Status>{children}</Status>
  )
}

export default ApplicationStatus