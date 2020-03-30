// Renders the projects view for a user.
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Container, Box, Text } from "@advisable/donut";
import useScrollRestore from "../../utilities/useScrollRestore";
import Loading from "./Loading";
import PROJECTS from "./getProjects";
import ProjectsList from "./ProjectsList";

const Projects = () => {
  useScrollRestore();
  const { loading, data } = useQuery(PROJECTS);

  return (
    <Container pt="xl">
      <Text
        as="h2"
        fontSize="28px"
        color="blue900"
        fontWeight="semibold"
        letterSpacing="-0.02em"
      >
        Your Projects
      </Text>
      <Box height={1} bg="neutral.2" mt="l" mb="l" />

      {loading ? <Loading /> : <ProjectsList projects={data.viewer.projects} />}
    </Container>
  );
};

export default Projects;
