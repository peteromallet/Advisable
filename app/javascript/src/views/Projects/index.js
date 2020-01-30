// Renders the projects view for a user.
import React from "react";
import { useQuery } from "react-apollo";
import { Box, Text } from "@advisable/donut";
import useScrollRestore from "../../utilities/useScrollRestore";
import Loading from "./Loading";
import PROJECTS from "./getProjects";
import ProjectsList from "./ProjectsList";

const Projects = () => {
  useScrollRestore();
  const { loading, data } = useQuery(PROJECTS);

  return (
    <Box maxWidth={1100} mx="auto" pt="xl">
      <Text
        as="h2"
        fontSize="28px"
        fontWeight="semibold"
        color="blue.9"
        letterSpacing="-0.03em"
      >
        Your projects
      </Text>
      <Box height={1} bg="neutral.2" mt="l" mb="l" />

      {loading ? <Loading /> : <ProjectsList projects={data.viewer.projects} />}
    </Box>
  );
};

export default Projects;
