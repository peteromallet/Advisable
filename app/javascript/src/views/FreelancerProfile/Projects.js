import React from "react";
import ProjectCard from "./ProjectCard";

function Projects({ data }) {
  const specialist = data.specialist;

  return (
    <>
      {specialist.previousProjects.map(previousProject => (
        <ProjectCard
          key={previousProject.project.id}
          description={previousProject.project.description}
        />
      ))}
    </>
  );
}

export default Projects;
