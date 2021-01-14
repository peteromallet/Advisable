import React from "react";
import { RefreshCcw, Edit3, XOctagon } from "@styled-icons/feather";
import { Box, Text, Avatar } from "@advisable/donut";
import {
  StyledBadge,
  StyledBadgePrefix,
  StyledMessage,
  StyledTitle,
} from "./styles";

function Review({ review }) {
  const { role, name, companyName } = review;
  const displayName = name?.split(" ")[0] || role;
  const title = name ? `${role} at ${companyName}` : companyName;

  return (
    <Box
      display="flex"
      px={6}
      borderTop="1px solid"
      borderTopColor="neutral100"
      py={3}
      alignItems="center"
    >
      <Box mr={2}>
        <Avatar size="xs" bg="neutral100" name={name} url={review.avatar} />
      </Box>
      <Box>
        <Text fontSize="s" fontWeight="medium" color="neutral700" mb={0.5}>
          Reviewed by {displayName}
        </Text>
        <Text fontSize="xs" color="neutral600">
          {title}
        </Text>
      </Box>
    </Box>
  );
}

function Status(props) {
  return (
    <Box px={6} pb={6}>
      <StyledBadge
        variant={props.variant}
        prefix={props.icon}
        width="100%"
        py={2.5}
        px={3}
      >
        <Box display="flex" alignItems="center" mb={1.5}>
          <StyledBadgePrefix>{props.icon}</StyledBadgePrefix>
          <StyledTitle>{props.label}</StyledTitle>
        </Box>
        <StyledMessage>{props.message}</StyledMessage>
      </StyledBadge>
    </Box>
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
    message: "This project is not visible to others",
    icon: <Edit3 />,
  },
  Pending: {
    component: Status,
    variant: "yellow",
    label: "Pending Validation",
    message:
      "This project will not be visible to others until it has been verified",
    icon: <RefreshCcw />,
  },
  "Validation Failed": {
    component: Status,
    variant: "red",
    label: "Validation Failed",
    message: "Client rejected this project and it's not publicly visible",
    icon: <XOctagon />,
  },
};

function ProjectStatus({ project }) {
  const status =
    (project.draft && "Draft") || project.validationStatus || "Validated";
  const config = STATUSES[status];

  return <config.component {...config} review={project.reviews?.[0]} />;
}

export default ProjectStatus;
