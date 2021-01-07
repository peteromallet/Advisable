import React from "react";
import { RefreshCcw, Edit2, AlertCircle } from "@styled-icons/feather";
import { Box, Text, Avatar } from "@advisable/donut";
import { StyledBadge, StyledBadgePrefix } from "./styles";

function Review({ review }) {
  const role = review.role;
  const atCompany = review.companyName && `at ${review.companyName}`;
  return (
    <Box display="flex" py={3} alignItems="center">
      <Box mr={2}>
        <Avatar
          size="xs"
          bg="neutral100"
          name={review.name}
          url={review.avatar}
        />
      </Box>
      <Box>
        <Text fontSize="s" fontWeight="medium" color="neutral700" mb={0.5}>
          Reviewed by {review.firstName}
        </Text>
        <Text fontSize="xs" color="neutral600">
          {role} {atCompany}
        </Text>
      </Box>
    </Box>
  );
}

function Status(props) {
  return (
    <StyledBadge variant={props.variant} prefix={props.icon} width="100%">
      <StyledBadgePrefix>{props.icon}</StyledBadgePrefix>
      {props.label}
    </StyledBadge>
  );
}

const STATUSES = {
  Validated: {
    component: Review,
  },
  Draft: {
    component: Status,
    variant: "neutral",
    label: "Draft Project",
    icon: <Edit2 />,
  },
  Pending: {
    component: Status,
    variant: "yellow",
    label: "Pending Validation",
    icon: <RefreshCcw />,
  },
  "Validation Failed": {
    component: Status,
    variant: "red",
    label: "Validation Failed",
    icon: <AlertCircle />,
  },
};

function ProjectStatus({ project }) {
  const status = (project.draft && "Draft") || project.validationStatus;
  const config = STATUSES[status];

  return (
    <Box px={6} borderTop="1px solid" borderTopColor="neutral100">
      <config.component {...config} review={project.reviews?.[0]} />
    </Box>
  );
}

export default ProjectStatus;
