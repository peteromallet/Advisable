import * as React from "react";
import { Tooltip } from "@advisable/donut";
import Status from "./Status";

// This component is used in mulitiple places to display the validation status
// of a previous project.

// Map the various statuses to the values that should be displayed
const STATUSES = {
  Pending: {
    label: "Verification Pending",
    styling: "yellow",
    tooltip:
      "Advisable is working to verify with the client that this project happened.",
    hideForClients: true,
  },
  "In Progress": {
    label: "Verification In Progress",
    styling: "yellow",
    tooltip: "Advisable is in the process of verifying this project",
    hideForClients: true,
  },
  Validated: {
    label: "Verified",
    icon: "check",
    styling: "green",
    tooltip:
      "This is a project that either happened on Advisable or Advisable has verified that it happened with a 3rd party.",
  },
  "Validation Failed": {
    label: "Unverified",
    icon: "alert-circle",
    tooltip:
      "This project didn't happen on Advisable and we weren't able to verify with a 3rd party that it happened.",
  },
};

const ProjectValidationStatus = ({ status, isClient = false }) => {
  const config = STATUSES[status || "Validated"];

  if (config.hideForClients && isClient) return null;

  return (
    <Tooltip content={config.tooltip}>
      <Status icon={config.icon} styling={config.styling}>
        {config.label}
      </Status>
    </Tooltip>
  );
};

export default ProjectValidationStatus;
