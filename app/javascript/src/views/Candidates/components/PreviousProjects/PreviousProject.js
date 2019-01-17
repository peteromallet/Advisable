import React, { useState } from "react";
import StarRating from "src/components/StarRating";
import PreviousProjectModal from "src/components/PreviousProjectModal";
import { PreviousProject, ProjectTitle, ProjectDescription } from "./styles";

export default ({ applicationId, project }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <React.Fragment>
      <PreviousProjectModal
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        id={project.id}
        type={project.type}
        applicationId={applicationId}
      />

      <PreviousProject onClick={() => setOpen(true)}>
        <ProjectTitle>
          {project.title} at {project.clientName}
        </ProjectTitle>
        <ProjectDescription>{project.description}</ProjectDescription>
        {project.reviews.length > 0 && (
          <StarRating rating={project.reviews[0].ratings.overall} />
        )}
      </PreviousProject>
    </React.Fragment>
  );
};
