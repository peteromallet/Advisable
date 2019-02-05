// @flow
import * as React from "react";
import Status from "./Status";
import Tooltip from "./Tooltip";

// This component is used in mulitiple places to display the validation status
// of a previous project.

// Map the various statuses to the values that should be displayed
const STATUSES = {
  Pending: {
    label: "Verification Pending",
    icon: "refresh-cw",
    styling: "yellow",
    tooltip: "Advisable is working to verify with the client that this project happened. "
  },
  Validated: {
    label: "Verified",
    icon: "check",
    styling: "green",
    tooltip: "This is a project that either happened on Advisable or Advisable has verified that it happened with a 3rd party. "
  },
  "Validation Failed": {
    label: "Unverified",
    icon: "alert-circle",
    tooltip: "This project didn't happen on Advisable and we weren't able to verify with a 3rd party that it happened."
  }
};

export interface Props {
  status?: string;
}

const ProjectValidationStatus = ({ status }: Props) => {
  const config = STATUSES[status || "Validated"];
  return (
    <Tooltip content={config.tooltip}>
      <Status icon={config.icon} styling={config.styling}>
        {config.label}
      </Status>
    </Tooltip>
  );
};

export default ProjectValidationStatus;
