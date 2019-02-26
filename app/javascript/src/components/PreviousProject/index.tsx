import * as React from "react";
import Flex from "../Flex";
import Spacing from "../Spacing";
import StarRating from "../StarRating";
import { useMobile } from "../Breakpoint";
import ProjectValidationStatus from "../ProjectValidationStatus";
import PreviousProjectModal from "../PreviousProjectModal";
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
  const [isOpen, setOpen] = React.useState(false);
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
