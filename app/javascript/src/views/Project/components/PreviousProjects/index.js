// Fetches a specialists previous projects.
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import Button from "src/components/Button";
import Heading from "src/components/Heading";
import PreviousProject from "src/components/PreviousProject";
import PreviousProjectsEmptyState from "src/components/PreviousProjectsEmptyState";
import ProjectSkeleton from "./ProjectSkeleton";
import FETCH_PROJECTS from "./fetchProjects.graphql";
import PreviousProjectsModal from "../../../../components/PreviousProjectsModal";

const PreviousProjects = ({ project, ...props }) => {
  const { data, loading } = useQuery(FETCH_PROJECTS, {
    variables: {
      applicationId: props.applicationId,
    },
  });

  return (
    <>
      <Heading level="6" marginBottom="s">
        <>Previous Projects related to "{project.primarySkill}"</>
      </Heading>

      {loading ? (
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
    </>
  );
};

const SpecialistProjects = ({ data, hasMoreProjects }) => {
  const [viewAllProjects, setViewAllProjects] = React.useState(
    !hasMoreProjects,
  );

  if (data.application.previousProjects.length > 0) {
    const projects = data.application.previousProjects;

    return (
      <React.Fragment>
        {projects.map((previousProject) => (
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

export default PreviousProjects;
