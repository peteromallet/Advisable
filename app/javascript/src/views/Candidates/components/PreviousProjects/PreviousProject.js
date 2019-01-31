import React, { useState } from "react";
import StarRating from "src/components/StarRating";
import PreviousProjectModal from "src/components/PreviousProjectModal";
import { PreviousProject, ProjectTitle, ProjectDescription } from "./styles";

const companyName = project => {
  if (project.__typename === "Project") {
    return project.user.companyName
  }

  if (project.confidential) {
    return `${project.industsry} Company`
  }

  return project.clientName
}

const title = project => {
  if (project.skills && project.skills.length > 0) {
    const skills = project.skills.join(', ')
    return `${skills} at ${companyName(project)}`
  }

  return `${project.primarySkill} at ${companyName(project)}`
}

export default ({ specialistId, previousProject }) => {
  const [isOpen, setOpen] = useState(false);

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
        <ProjectTitle>
          {title(project)}
        </ProjectTitle>
        <ProjectDescription>{project.description}</ProjectDescription>
        {reviews.length > 0 && (
          <StarRating rating={reviews[0].ratings.overall} />
        )}
      </PreviousProject>
    </React.Fragment>
  );
};
