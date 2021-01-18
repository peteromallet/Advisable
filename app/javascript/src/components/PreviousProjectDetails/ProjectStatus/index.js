import React from "react";
import { Box } from "@advisable/donut";
import Status from "./Status";
import { DraftCTA, FailedCTA } from "./CTAs";
import { Pencil, Exclamation } from "@styled-icons/heroicons-outline";
import ProjectValidationPrompt from "src/components/ProjectValidationPrompt";
import Review from "src/components/Review";

function Validated({ project }) {
  return project.reviews.length > 0 && project.reviews[0]?.comment ? (
    <Review review={project.reviews[0]} />
  ) : null;
}

function Pending({ project }) {
  return <ProjectValidationPrompt project={project} />;
}

const STATUSES = {
  Validated: {
    component: Validated,
  },
  Draft: {
    component: Status,
    variant: "neutral",
    label: "Draft Project",
    message:
      "This project has not been published and will not be visible on your profile. Continue editing to post it to your profile.",
    icon: <Pencil />,
    CTA: DraftCTA,
  },
  Pending: {
    component: Pending,
  },
  "Validation Failed": {
    component: Status,
    variant: "red",
    label: "Validation Failed",
    message:
      "Unfortunately the client was unable to verify this project. It will not be visible to others until it is validated. You can update the project and request validation again or remove the project.",
    icon: <Exclamation />,
    CTA: FailedCTA,
  },
};

function ProjectStatus({ project, modal }) {
  const status = (project.draft && "Draft") || project.validationStatus;
  const config = STATUSES[status];

  return (
    <Box mt={5} pt={6} pb={2} borderTop="1px solid" borderTopColor="neutral100">
      <config.component
        project={project}
        modal={modal}
        review={project.reviews?.[0]}
        {...config}
      />
    </Box>
  );
}

export default ProjectStatus;
