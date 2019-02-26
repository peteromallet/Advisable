// Fetches a specialists previous projects.
import React, { useLayoutEffect } from "react";
import { graphql } from "react-apollo";
import Button from "src/components/Button";
import Heading from "src/components/Heading";
import PreviousProject from "src/components/PreviousProject";
import PreviousProjectsEmptyState from "src/components/PreviousProjectsEmptyState";
import ProjectSkeleton from "./ProjectSkeleton";
import FETCH_PROJECTS from "./fetchProjects.graphql";
import PreviousProjectsModal from "../../../../components/PreviousProjectsModal";

const PreviousProjects = ({ data, recalculateHeight, project }) => {
  useLayoutEffect(() => {
    recalculateHeight();
  });

  return (
    <React.Fragment>
      <Heading level="6" marginBottom="s">
        <React.Fragment>
          Previous Projects related to "{project.primarySkill}"
        </React.Fragment>
      </Heading>

      {data.loading ? (
        <React.Fragment>
          <ProjectSkeleton />
          <ProjectSkeleton />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <SpecialistProjects
            hasMoreProjects={data.application.hasMoreProjects}
            data={data}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const SpecialistProjects = ({ data, hasMoreProjects }) => {
  const [viewAllProjects, setViewAllProjects] = React.useState(
    !hasMoreProjects
  );

  if (data.application.previousProjects.length > 0) {
    const projects = data.application.previousProjects;

    return (
      <React.Fragment>
        {projects.map(previousProject => (
          <PreviousProject
            key={previousProject.project.id}
            previousProject={previousProject}
            specialistId={data.application.specialist.airtableId}
          />
        ))}
        {hasMoreProjects && (
          <React.Fragment>
            <PreviousProjectsModal
              isOpen={viewAllProjects}
              onClose={() => setViewAllProjects(false)}
              specialistId={data.application.specialist.airtableId}
            />
            <Button styling="outlined" onClick={() => setViewAllProjects(true)}>
              View all projects
            </Button>
          </React.Fragment>
        )}
      </React.Fragment>
    );
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
