import { memo } from "react";
import { Tooltip, Badge } from "@advisable/donut";
import { Refresh } from "@styled-icons/heroicons-outline";
import { CheckCircle, Pencil } from "@styled-icons/heroicons-solid";

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
    tooltip: "This project has not been validated yet.",
  },
  Validated: {
    variant: "cyan",
    label: "Verified",
    icon: <CheckCircle />,
  },
  "Validation Failed": {
    variant: "orange",
    label: "Pending",
    icon: <Refresh />,
    tooltip: "This project has not been validated yet.",
  },
};

const ProjectStatus = memo(function ProjectStatus({ previousProject }) {
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
