import React from "react";
import { Box } from "@advisable/donut";
import Review from "src/components/Review";
import { RefreshCcw, Edit2, XOctagon } from "@styled-icons/feather";
import ProjectValidationPrompt from "src/components/ProjectValidationPrompt";
import {
  StyledBadge,
  StyledBadgePrefix,
  StyledMessage,
  StyledTitle,
} from "./styles";

function Validated({ project }) {
  return project.reviews.length > 0 && project.reviews[0]?.comment ? (
    <>
      <Box height={1} bg="neutral100" mb={6} />
      <Review review={project.reviews[0]} />
    </>
  ) : null;
}

function Pending({ project }) {
  return <ProjectValidationPrompt project={project} />;
}

function Status(props) {
  return (
    <StyledBadge variant={props.variant} prefix={props.icon} p={3}>
      <Box display="flex">
        <Box mr={1}>
          <StyledBadgePrefix>{props.icon}</StyledBadgePrefix>
        </Box>
        <Box>
          <StyledTitle fontSize="s" fontWeight="medium" mb="xxs">
            {props.label}
          </StyledTitle>
          <StyledMessage fontSize="xs" lineHeight="s">
            {props.message}
          </StyledMessage>
        </Box>
      </Box>
    </StyledBadge>
  );
}

const STATUSES = {
  Validated: {
    component: Validated,
  },
  Draft: {
    component: Status,
    variant: "neutral",
    label: "Draft Project",
    message: "This project is not visible to others",
    icon: <Edit2 />,
  },
  Pending: {
    component: Pending,
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
    message: "Client rejected this project and it's not displaying",
    icon: <XOctagon />,
  },
};

function ProjectStatus({ project }) {
  const status = (project.draft && "Draft") || project.validationStatus;
  const config = STATUSES[status];

  return (
    <Box mt={5}>
      <config.component
        project={project}
        {...config}
        review={project.reviews?.[0]}
      />
    </Box>
  );
}

export default ProjectStatus;
