import React from "react";
import Card from "src/components/Card";
import Heading from "src/components/Heading";
import PreviousProjectsEmptyState from "src/components/PreviousProjectsEmptyState";
import PreviousProject from "./PreviousProject";

export default ({
  projects,
  name,
  applicationId,
  referencesRequested
}) => {
  return (
    <React.Fragment>
      <Heading level="6" paddingTop="l" marginBottom="s">
        Previous Projects
      </Heading>
      {projects.map(project => (
        <PreviousProject
          key={project.id}
          project={project}
          applicationId={applicationId}
        />
      ))}

      {projects.length === 0 && (
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
