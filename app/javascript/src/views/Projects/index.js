// Renders the projects view for a user.
import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Container, Text } from "@advisable/donut";
import Loading from "./Loading";
import { GET_PROJECTS } from "./queries";
import ProjectsList from "./ProjectsList";
import UpdateIndustryModal from "./UpdateIndustryModal";
import dataLayer from "src/utilities/dataLayer";
import useViewer from "src/hooks/useViewer";
import AccountConfirmationPrompt from "src/components/AccountConfirmationPrompt";
import ClientApplicationPrompt from "src/components/ClientApplicationPrompt";

const Projects = () => {
  const viewer = useViewer();
  const location = useLocation();
  const { loading, data } = useQuery(GET_PROJECTS);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleCreate = (cache, response) => {
    const { currentCompany, viewer } = cache.readQuery({ query: GET_PROJECTS });

    dataLayer.push({
      event: "projectStarted",
      projectId: response.data.createJob.project.id,
      projectCount: currentCompany.projects.length + 1,
    });

    cache.writeQuery({
      query: GET_PROJECTS,
      data: {
        viewer,
        currentCompany: {
          ...currentCompany,
          projects: [
            response.data.createJob.project,
            ...currentCompany.projects,
          ],
        },
      },
    });
  };

  return (
    <Container py="xl">
      <ClientApplicationPrompt />
      <AccountConfirmationPrompt />

      {!loading && (
        <UpdateIndustryModal
          industry={data?.viewer.industry}
          companyType={data?.viewer.companyType}
        />
      )}

      {viewer.isAccepted ? (
        <>
          <Text
            mb={5}
            as="h2"
            fontSize="4xl"
            color="neutral900"
            fontWeight="medium"
            letterSpacing="-0.04rem"
          >
            Your Projects
          </Text>

          {loading ? (
            <Loading />
          ) : (
            <ProjectsList
              projects={data.currentCompany.projects}
              onCreate={handleCreate}
            />
          )}
        </>
      ) : null}
    </Container>
  );
};

export default Projects;
