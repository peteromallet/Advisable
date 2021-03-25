import React from "react";
import Status from "./Status";
import { DraftCTA, FailedCTA } from "./CTAs";
import { Exclamation } from "@styled-icons/heroicons-outline/Exclamation";
import { EyeOff } from "@styled-icons/ionicons-outline/EyeOff";
import ProjectValidationPrompt from "src/components/ProjectValidationPrompt";
import Review from "src/components/Review";
import { StatusWrapper } from "./styles";

function Validated({ project }) {
  const review = project.reviews?.[0];
  const hasComment = review?.comment;

  if (!hasComment) return null;

  return (
    <StatusWrapper>
      <Review review={review} />
    </StatusWrapper>
  );
}

function Pending({ project }) {
  return (
    <StatusWrapper>
      <ProjectValidationPrompt project={project} />
    </StatusWrapper>
  );
}

function Draft({ project, modal, ...props }) {
  return (
    <Status
      variant="neutral"
      icon={<EyeOff />}
      CTA={DraftCTA}
      label="Draft Project"
      message="This project has not been published and will not be visible on your profile. Continue editing to post it to your profile."
      project={project}
      modal={modal}
      {...props}
    />
  );
}

function ValidationFailed({ project, modal, ...props }) {
  return (
    <Status
      variant="red"
      icon={<Exclamation />}
      CTA={FailedCTA}
      label="Validation Failed"
      message="
Unfortunately the client was unable to verify this project. It will not be visible to others until it is validated. You can update the project and request validation again or remove the project."
      project={project}
      modal={modal}
      {...props}
    />
  );
}

function ProjectStatus({ project, modal, viewerIsOwner, ...props }) {
  const status = (project.draft && "Draft") || project.validationStatus;

  switch (status) {
    case "Validated": {
      return <Validated project={project} />;
    }
    case "Pending": {
      if (!viewerIsOwner) return null;
      return <Pending project={project} />;
    }
    case "Draft": {
      if (!viewerIsOwner) return null;
      return <Draft project={project} modal={modal} {...props} />;
    }
    case "Validation Failed": {
      if (!viewerIsOwner) return null;
      return <ValidationFailed project={project} modal={modal} {...props} />;
    }
    default: {
      return null;
    }
  }
}

export default ProjectStatus;
