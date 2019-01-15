import React, { useState } from "react";
import StarRating from "src/components/StarRating";
import PreviousProjectModal from "src/components/PreviousProjectModal";
import { PreviousProject, ProjectTitle, ProjectDescription } from "./styles";

export default ({ project }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <React.Fragment>
      <PreviousProjectModal
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        id={project.id}
        type={project.type}
        specialistId={project.specialist.airtableId}
      />

      <PreviousProject onClick={() => setOpen(true)}>
        <ProjectTitle>
          {project.title} at {project.companyName}
        </ProjectTitle>
        <ProjectDescription>{project.description}</ProjectDescription>
        <StarRating rating={4} />
      </PreviousProject>
    </React.Fragment>
  );
};
