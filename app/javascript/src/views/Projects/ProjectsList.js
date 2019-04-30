import React, { Fragment, useState } from "react";
import Text from "../../components/Text";
import Status from "../../components/Status";
import pluralize from "../../utilities/pluralize";
import NewProjectModal from "./NewProjectModal";
import {
  Tile,
  ProjectCard,
  NewProject,
  ProjectTitle,
  ProjectStatus,
  ProjectDescription
} from "./styles";

export default ({ projects }) => {
  const [newProjectModal, setNewProjectModal] = useState(false);
  return (
    <Fragment>
      <NewProjectModal
        isOpen={newProjectModal}
        onClose={() => setNewProjectModal(false)}
      />
      <Tile>
        <NewProject onClick={() => setNewProjectModal(true)}>
          Start a new project
        </NewProject>
      </Tile>
      {projects.map(project => (
        <Tile key={project.id}>
          <ProjectCard to={`/projects/${project.airtableId}`}>
            <ProjectTitle>{project.primarySkill}</ProjectTitle>
            <Text size="s" marginBottom="l">
              {pluralize(project.applicationCount, "Candidate", "Candidates")}
            </Text>
            <Status>{project.status}</Status>
            <ProjectDescription>{project.description}</ProjectDescription>
          </ProjectCard>
        </Tile>
      ))}
    </Fragment>
  );
};
