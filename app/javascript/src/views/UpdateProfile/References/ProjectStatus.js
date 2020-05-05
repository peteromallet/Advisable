import React from "react";
import { Refresh } from "@styled-icons/heroicons-outline";
import {
  ExclamationCircle,
  CheckCircle,
  Pencil,
} from "@styled-icons/heroicons-solid";
import { Tooltip, Badge } from "@advisable/donut";

const STATUSES = {
  Draft: {
    variant: "neutral",
    label: "Draft",
    icon: <Pencil />,
    tooltip: "This project has not been published yet.",
  },
  Pending: {
    variant: "orange",
    label: "Pending Verification",
    icon: <Refresh />,
    tooltip: "Advisable is working to verify this project with the client",
  },
  "In Progress": {
    variant: "orange",
    label: "Verification In Progress",
    icon: <Refresh />,
    tooltip: "Advisable is in the process of verifying this project",
  },
  Validated: {
    variant: "cyan",
    label: "Verified",
    icon: <CheckCircle />,
  },
  "Validation Failed": {
    variant: "neutral",
    label: "Unverified",
    icon: <ExclamationCircle />,
    tooltip:
      "This project didn't happen on Advisable and we weren't able to verify with a 3rd party that it happened.",
  },
};

const ProjectStatus = React.memo(function ProjectStatus({ previousProject }) {
  let status = previousProject.draft
    ? "Draft"
    : previousProject.validationStatus;
  let config = STATUSES[status];
  if (!config) return null;
  return (
    <Tooltip content={config.tooltip}>
      <Badge variant={config.variant} prefix={config.icon}>
        {config.label}
      </Badge>
    </Tooltip>
  );
});

export default ProjectStatus;
