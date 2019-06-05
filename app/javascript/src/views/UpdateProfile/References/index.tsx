import * as React from "react";
import { get } from "lodash";
import { graphql } from "react-apollo";
import Text from "../../../components/Text";
import Button from "../../../components/Button";
import Loading from "../../../components/Loading";
import Heading from "../../../components/Heading";
import Padding from "../../../components/Spacing/Padding";
import PreviousProjects from "../../../components/PreviousProjects";
import AddPreviousProjectModal from "../../../components/AddPreviousProjectModal";
import PREVIOUS_PROJECTS from "./previousProjects";

const References = ({ data }) => {
  const [modalOpen, setModalOpen] = React.useState(false);

  if (data.loading) return <Loading />;

  const handleAddProject = () => {
    setModalOpen(true);
  };

  return (
    <React.Fragment>
      <Padding bottom="s">
        <Heading level={2}>Previous Projects</Heading>
      </Padding>
      <Padding bottom="m">
        <Text size="xs">
          Previous projects are one of the most effective ways to validate your
          skills and experience. Advisable uses them to decide who to invite to
          our platform, which projects to invite them to and gives you the
          opportunity to share them with clients when you’re applying for
          projects
        </Text>
      </Padding>

      <Padding bottom="xl">
        <Button styling="primary" onClick={handleAddProject}>
          Add a previous project
        </Button>
      </Padding>
      <AddPreviousProjectModal
        isOpen={modalOpen}
        specialistId={data.viewer.airtableId}
        onClose={() => setModalOpen(false)}
        mutationUpdate={(proxy, response) => {
          const data = proxy.readQuery({ query: PREVIOUS_PROJECTS });
          const project =
            response.data.createOffPlatformProject.previousProject;
          data.viewer.previousProjects.unshift(project);
          proxy.writeQuery({ query: PREVIOUS_PROJECTS, data });
        }}
      />

      <PreviousProjects
        loading={data.loading}
        specialistId={data.viewer.airtableId}
        previousProjects={get(data, "viewer.previousProjects")}
      />
    </React.Fragment>
  );
};

export default graphql(PREVIOUS_PROJECTS)(References);
