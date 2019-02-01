// Fetches a specialists previous projects.
import React, { useLayoutEffect } from "react";
import { graphql } from "react-apollo";
import Heading from "src/components/Heading";
import PreviousProjectsEmptyState from "src/components/PreviousProjectsEmptyState";
import PreviousProject from "./PreviousProject";
import ProjectSkeleton from "./ProjectSkeleton";
import FETCH_PROJECTS from "./fetchProjects.graphql";

const PreviousProjects = ({ data, recalculateHeight }) => {
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
        <SpecialistProjects data={data} />
      )}
    </React.Fragment>
  );
};

const SpecialistProjects = ({ data }) => {
  if (data.application.specialist.previousProjects.length > 0) {
    return data.application.specialist.previousProjects.map(previousProject => (
      <PreviousProject
        key={previousProject.project.id}
        previousProject={previousProject}
        specialistId={data.application.specialist.airtableId}
      />
    ));
  }

  return (
    <PreviousProjectsEmptyState
      name={data.application.specialist.name}
      applicationId={data.application.airtableId}
      specialistId={data.application.specialist.airtableId}
      referencesRequested={data.application.referencesRequested}
    />
  );
};

export default graphql(FETCH_PROJECTS, {
  options: props => ({
    variables: {
      applicationId: props.applicationId
    }
  })
})(PreviousProjects);
