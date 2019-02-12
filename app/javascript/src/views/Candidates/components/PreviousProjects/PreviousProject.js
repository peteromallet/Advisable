import React, { useState } from "react";
import Flex from "src/components/Flex";
import Spacing from "src/components/Spacing";
import StarRating from "src/components/StarRating";
import ProjectValidationStatus from "src/components/ProjectValidationStatus";
import PreviousProjectModal from "src/components/PreviousProjectModal";
import { useMobile } from "src/components/Breakpoint";
import { PreviousProject, ProjectTitle, ProjectDescription } from "./styles";

const companyName = project => {
  if (project.__typename === "Project") {
    return project.user.companyName;
  }

  return project.clientName;
};

const title = project => {
  return `${project.primarySkill} at ${companyName(project)}`;
};

export default ({ specialistId, previousProject }) => {
  const [isOpen, setOpen] = useState(false);
  const isMobile = useMobile();
  const { project, reviews } = previousProject;

  return (
    <React.Fragment>
      <PreviousProjectModal
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        id={project.airtableId}
        type={project.__typename}
        specialistId={specialistId}
      />

      <PreviousProject onClick={() => setOpen(true)}>
        <ProjectTitle>{title(project)}</ProjectTitle>
        <ProjectDescription>{project.description}</ProjectDescription>
        <Flex align="center">
          {!isMobile && (
            <Spacing paddingRight="s">
              <ProjectValidationStatus status={project.validationStatus} />
            </Spacing>
          )}
          {reviews.length > 0 && (
            <StarRating rating={reviews[0].ratings.overall} />
          )}
        </Flex>
      </PreviousProject>
    </React.Fragment>
  );
};
