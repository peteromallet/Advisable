import React from "react";
import Card from "src/components/Card";
import Heading from "src/components/Heading";
import PreviousProjectsEmptyState from "src/components/PreviousProjectsEmptyState";
import PreviousProject from "./PreviousProject";

export default ({
  previousProjects,
  name,
  applicationId,
  specialistId,
  referencesRequested
}) => {
  return (
    <React.Fragment>
      <Heading level="6" paddingTop="l" marginBottom="s">
        Previous Projects
      </Heading>
      {previousProjects.map(previousProject => (
        <PreviousProject
          key={previousProject.project.id}
          previousProject={previousProject}
          specialistId={specialistId}
        />
      ))}

      {previousProjects.length === 0 && (
        <Card>
          <PreviousProjectsEmptyState
            name={name}
            applicationId={applicationId}
            referencesRequested={referencesRequested}
          />
        </Card>
      )}
    </React.Fragment>
  );
};
