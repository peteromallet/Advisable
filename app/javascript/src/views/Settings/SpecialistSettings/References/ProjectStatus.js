import React from "react";
import { Refresh } from "@styled-icons/heroicons-outline";
import { CheckCircle, Pencil } from "@styled-icons/heroicons-solid";
import { Tooltip, Badge } from "@advisable/donut";
import { Chunk } from 'editmode-react'

const STATUSES = {
  Draft: {
    variant: "neutral",
    label: <Chunk identifier='draft_badge'>Draft</Chunk>,
    icon: <Pencil />,
    tooltip: <Chunk identifier='draft_badge_tooltip'>This project has not been published yet.</Chunk>,
  },
  Pending: {
    variant: "orange",
    label: <Chunk identifier='pending_verification_badge'>Pending Verification</Chunk>,
    icon: <Refresh />,
    tooltip: <Chunk identifier='pending_verification_badge_tooltip'>This project has not been validated yet.</Chunk>,
  },
  Validated: {
    variant: "cyan",
    label: <Chunk identifier='verified_badge'>Verified</Chunk>,
    icon: <CheckCircle />,
  },
  "Validation Failed": {
    variant: "orange",
    label: <Chunk identifier='pending_badge'>Pending</Chunk>,
    icon: <Refresh />,
    tooltip: <Chunk identifier='pending_badge_tooltip'>This project has not been validated yet.</Chunk>,
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
