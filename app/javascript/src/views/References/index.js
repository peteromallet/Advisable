// Renders the view that allows specialists to manage their references.
import { get } from "lodash";
import { graphql } from "react-apollo";
import React, { useState } from "react";
import Text from "../../components/Text";
import NotFound from "../../views/NotFound";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Heading from "../../components/Heading";
import Container from "../../components/Container";
import PREVIOUS_PROJECTS from "./previousProjects.graphql";
import PreviousProjects from "../../components/PreviousProjects";
import AddPreviousProjectModal from "../../components/AddPreviousProjectModal";

const References = ({ match, data }) => {
  const specialistId = match.params.specialistID;
  const [modalOpen, setModalOpen] = useState(false);

  if (data.loading === false && !data.specialist) {
    return <NotFound />
  }

  const handleAddProject = () => setModalOpen(true);

  return (
    <React.Fragment>
      <Header />
      <Container size="m">
        <Heading marginBottom="m" level="1">
          Previous Projects
        </Heading>
        <Text marginBottom="l">
          Previous projects are one of the most effective ways to validate your
          skills and experience. Advisable uses them to decide who to invite to
          our platform, which projects to invite them to and gives you the
          opportunity to share them with clients when you’re applying for
          projects.
        </Text>

        <Button
          marginBottom="xl"
          size="l"
          styling="primary"
          onClick={handleAddProject}
        >
          Add a previous project
        </Button>
        <AddPreviousProjectModal
          isOpen={modalOpen}
          specialistId={specialistId}
          onClose={() => setModalOpen(false)}
          mutationUpdate={(proxy, response) => {
            const data = proxy.readQuery({
              query: PREVIOUS_PROJECTS,
              variables: { id: specialistId }
            });
            const project =
              response.data.createOffPlatformProject.previousProject;
            data.specialist.previousProjects.unshift(project);
            proxy.writeQuery({ query: PREVIOUS_PROJECTS, data });
          }}
        />

        <Heading level="6" paddingTop="l" marginBottom="s">
          Previous Projects
        </Heading>
        <PreviousProjects
          specialistId={specialistId}
          previousProjects={get(data, "specialist.previousProjects")}
          loading={data.loading}
        />
      </Container>
    </React.Fragment>
  );
};

export default graphql(PREVIOUS_PROJECTS, {
  options: ({ match }) => ({
    variables: {
      id: match.params.specialistID
    }
  })
})(References);
