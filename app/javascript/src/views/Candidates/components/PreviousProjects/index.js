// Fetches a specialists previous projects.

import React, { useLayoutEffect } from "react";
import { graphql } from "react-apollo";
import Heading from "src/components/Heading";
import PreviousProjectsEmptyState from "src/components/PreviousProjectsEmptyState";
import PreviousProject from "./PreviousProject";
import ProjectSkeleton from "./ProjectSkeleton";
import FETCH_PROJECTS from "./fetchProjects.graphql";
import { EmptyStateContainer } from "./styles";

const PreviousProjects = ({
  data,
  recalculateHeight,
  applicationId,
  name,
  referencesRequested
}) => {
  useLayoutEffect(() => {
    recalculateHeight();
  });

  return (
    <React.Fragment>
      <Heading level="6" marginBottom="s">
        Previous Projects
      </Heading>

      {data.loading ? (
        <React.Fragment>
          <ProjectSkeleton />
          <ProjectSkeleton />
        </React.Fragment>
      ) : (
        <SpecialistProjects
          name={name}
          applicationId={applicationId}
          referencesRequested={referencesRequested}
          previousProjects={data.specialist.previousProjects}
        />
      )}
    </React.Fragment>
  );
};

const SpecialistProjects = ({
  applicationId,
  name,
  previousProjects,
  referencesRequested
}) => {
  if (previousProjects.length > 0) {
    return previousProjects.map(project => (
      <PreviousProject key={project.id} project={project} />
    ));
  }

  return (
    <EmptyStateContainer>
      <PreviousProjectsEmptyState
        applicationId={applicationId}
        name={name}
        referencesRequested={referencesRequested}
      />
    </EmptyStateContainer>
  );
};

export default graphql(FETCH_PROJECTS, {
  options: props => ({
    variables: {
      specialistId: props.specialistId
    }
  })
})(PreviousProjects);
