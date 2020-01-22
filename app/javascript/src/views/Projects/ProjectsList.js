import React, { Fragment } from "react";
import Text from "../../components/Text";
import Status from "../../components/Status";
import pluralize from "../../utilities/pluralize";
import NewProject from "./NewProject";
import { Tile, ProjectCard, ProjectTitle, ProjectDescription } from "./styles";

const ProjectsList = ({ projects }) => {
  return (
    <Fragment>
      <Tile>
        <NewProject />
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

export default ProjectsList;
