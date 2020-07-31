// Fetches a specialists previous projects.
import React from "react";
import Heading from "src/components/Heading";
import { DialogDisclosure } from "reakit/Dialog";
import { useModal, Button } from "@advisable/donut";
import PreviousProject from "src/components/PreviousProject";
import PreviousProjectsEmptyState from "src/components/PreviousProjectsEmptyState";
import PreviousProjectsModal from "../../../../components/PreviousProjectsModal";

const PreviousProjects = ({ project, application }) => {
  const allProjectsModal = useModal();
  const hasProjects = application.previousProjects.length > 0;

  return (
    <>
      <Heading level="6" marginBottom="s">
        <>Previous Projects related to "{project.primarySkill.name}"</>
      </Heading>

      {!hasProjects && (
        <PreviousProjectsEmptyState
          name={application.specialist.name}
          applicationId={application.airtableId}
          specialistId={application.specialist.airtableId}
          referencesRequested={application.referencesRequested}
        />
      )}

      {application.previousProjects.map((previousProject) => (
        <PreviousProject
          key={previousProject.id}
          previousProject={previousProject}
          specialistId={application.specialist.airtableId}
        />
      ))}

      {hasProjects && application.hasMoreProjects && (
        <>
          <PreviousProjectsModal
            modal={allProjectsModal}
            specialistId={application.specialist.id}
          />
          <DialogDisclosure
            size="s"
            as={Button}
            variant="subtle"
            onClick={allProjectsModal.show}
          >
            View all projects
          </DialogDisclosure>
        </>
      )}
    </>
  );
};

export default PreviousProjects;
