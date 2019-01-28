import React from "react";
import Loading from "./Loading";
import PreviousProject from "./PreviousProject";

export default ({ loading, previousProjects, specialistId }) => {
  if (loading) {
    return <Loading />
  }

  return previousProjects.map(previousProject => (
    <PreviousProject
      key={previousProject.project.id}
      previousProject={previousProject}
      specialistId={specialistId}
    />
  ));
};
