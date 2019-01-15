import React from "react";
import Heading from "src/components/Heading";
import PreviousProject from "./PreviousProject";

export default ({ projects, specialistId }) => {
  return (
    <React.Fragment>
      <Heading level="6" marginBottom="s">
        Previous Projects
      </Heading>
      {projects.map(project => (
        <PreviousProject
          key={project.id}
          project={project}
          specialistId={specialistId}
        />
      ))}
    </React.Fragment>
  );
};
