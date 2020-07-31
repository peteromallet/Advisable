// Renders the projects view for a user.
import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Container, Text } from "@advisable/donut";
import Loading from "./Loading";
import { GET_PROJECTS } from "./queries";
import ProjectsList from "./ProjectsList";
import UpdateIndustryModal from "./UpdateIndustryModal";

const Projects = () => {
  const location = useLocation();
  const { loading, data } = useQuery(GET_PROJECTS);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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

      {!loading && (
        <UpdateIndustryModal
          industry={data?.viewer.industry}
          companyType={data?.viewer.companyType}
        />
      )}

      {loading ? (
        <Loading />
      ) : (
        <ProjectsList projects={data.viewer.projects} onCreate={handleCreate} />
      )}
    </Container>
  );
};

export default Projects;
