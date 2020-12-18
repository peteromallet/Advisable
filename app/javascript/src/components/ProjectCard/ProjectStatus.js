import React from "react";
import { Refresh } from "@styled-icons/heroicons-outline";
import { Pencil } from "@styled-icons/heroicons-solid";
import { Box, Text, Avatar } from "@advisable/donut";
import { StyledBadge, StyledBadgePrefix } from "./styles";

function Review({ review }) {
  const role = review.role;
  const atCompany = review.companyName && `at ${review.companyName}`;
  return (
    <Box display="flex" mt={4} alignItems="center">
      <Avatar
        size="xs"
        mr={2}
        bg="neutral100"
        name={review.name}
        url={review.avatar}
      />
      <Box>
        <Text fontSize="s" fontWeight="medium" color="neutral800" mb={0.5}>
          Reviewer by {review.name}
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
    icon: <Pencil />,
  },
  Pending: {
    component: Status,
    variant: "yellow",
    label: "Pending Verification",
    icon: <Refresh />,
  },
  "Validation Failed": {
    component: Status,
    variant: "red",
    label: "Validation Failed",
    icon: <Refresh />,
  },
};

function ProjectStatus({ project }) {
  console.log("project", project);
  const status = (project.draft && "Draft") || project.validationStatus;
  const config = STATUSES[status];
  console.log("config", config);
  return <config.component {...config} review={project.reviews?.[0]} />;
}

export default ProjectStatus;
