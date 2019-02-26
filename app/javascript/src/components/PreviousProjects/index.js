import React from "react";
import Loading from "./Loading";
import PreviousProject from "./PreviousProject";
import Button from "../Button";
import PreviousProjectsModal from "../PreviousProjectsModal";

export default ({
  loading,
  showValidationStatus,
  previousProjects,
  specialistId,
  hasMoreProjects
}) => {
  const [viewAllProjects, setViewAllProjects] = React.useState(!hasMoreProjects);

  if (loading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      {previousProjects.map(previousProject => (
        <PreviousProject
          specialistId={specialistId}
          key={previousProject.project.id}
          previousProject={previousProject}
          showValidationStatus={showValidationStatus}
        />
      ))}
      {hasMoreProjects && (
        <React.Fragment>
          <PreviousProjectsModal
            isOpen={viewAllProjects}
            onClose={() => setViewAllProjects(false)}
            specialistId={specialistId}
          />
          <Button size="l" block styling="outlined" onClick={() => setViewAllProjects(true)}>
            View all projects
          </Button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
