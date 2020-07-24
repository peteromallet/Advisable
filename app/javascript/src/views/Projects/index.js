// Renders the projects view for a user.
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Container, Box, Text } from "@advisable/donut";
import useScrollRestore from "../../utilities/useScrollRestore";
import Loading from "./Loading";
import { GET_PROJECTS } from "./queries";
import ProjectsList from "./ProjectsList";

const Projects = () => {
  useScrollRestore();
  const { loading, data } = useQuery(GET_PROJECTS);

  const handleCreate = (cache, response) => {
    const { viewer } = cache.readQuery({ query: GET_PROJECTS });
    cache.writeQuery({
      query: GET_PROJECTS,
      data: {
        viewer: {
          ...viewer,
          projects: [response.data.createJob.project, ...viewer.projects],
        },
      },
    });
  };

  return (
    <Container py="xl">
      <Text
        mb="l"
        as="h2"
        fontSize="24px"
        color="blue900"
        fontWeight="medium"
        letterSpacing="-0.07rem"
      >
        Your Projects
      </Text>

      {loading ? (
        <Loading />
      ) : (
        <ProjectsList projects={data.viewer.projects} onCreate={handleCreate} />
      )}
    </Container>
  );
};

export default Projects;
