import React from "react";
import { Box, Text } from "@advisable/donut";
import Status from "../../components/Status";
import pluralize from "../../utilities/pluralize";
import NewProject from "./NewProject";
import { ProjectCard, ProjectDescription } from "./styles";

const ProjectsList = ({ projects }) => {
  return (
    <Box flexWrap="wrap" display="flex" ml="-10px" mr="-10px">
      <Box width={[1, 1 / 2, 1 / 3]} px="10px" pb="m">
        <NewProject />
      </Box>
      {projects.map(project => (
        <Box width={[1, 1 / 2, 1 / 3]} key={project.id} px="10px" pb="m">
          <ProjectCard to={`/projects/${project.airtableId}`}>
            <Text
              as="h4"
              mb="xxs"
              fontSize="l"
              color="blue.9"
              fontWeight="semibold"
              letterSpacing="-0.015em"
            >
              {project.primarySkill}
            </Text>
            <Text fontSize="s" color="neutral.7" marginBottom="l">
              {pluralize(project.applicationCount, "Candidate", "Candidates")}
            </Text>
            <Status>{project.status}</Status>
            <ProjectDescription>{project.description}</ProjectDescription>
          </ProjectCard>
        </Box>
      ))}
    </Box>
  );
};

export default ProjectsList;
