import React from "react";
import Loading from "./Loading";
import PreviousProject from "./PreviousProject";

export default ({
  loading,
  showValidationStatus,
  previousProjects,
  specialistId
}) => {
  if (loading) {
    return <Loading />;
  }

  return previousProjects.map(previousProject => (
    <PreviousProject
      specialistId={specialistId}
      key={previousProject.project.id}
      previousProject={previousProject}
      showValidationStatus={showValidationStatus}
    />
  ));
};
