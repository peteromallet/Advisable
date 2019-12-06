import * as React from "react";
import { get } from "lodash";
import { graphql } from "react-apollo";
import {
  Box,
  Text,
  RoundedButton,
  Modal,
  useRoutedModal,
  Icon,
} from "@advisable/donut";
import Loading from "../../../components/Loading";
import Padding from "../../../components/Spacing/Padding";
import PreviousProjects from "../../../components/PreviousProjects";
import PreviousProjectForm from "../../../components/PreviousProjectForm";
import AddPreviousProjectModal from "../../../components/AddPreviousProjectModal";
import PREVIOUS_PROJECTS from "./previousProjects";

const References = ({ data }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const modal = useRoutedModal("/profile/references/new_project/client");

  if (data.loading) return <Loading />;

  const handleAddProject = () => {
    setModalOpen(true);
  };

  return (
    <React.Fragment>
      <Padding bottom="s">
        <Text as="h2" fontSize="xxl" fontWeight="semibold">
          Previous Projects
        </Text>
      </Padding>
      <Text fontSize="s" lineHeight="s" color="neutral.7" mb="l">
        Previous projects are one of the most effective ways to validate your
        skills and experience. Advisable uses them to decide who to invite to
        our platform, which projects to invite them to and gives you the
        opportunity to share them with clients when you’re applying for projects
      </Text>

      <Padding bottom="xl">
        <RoundedButton mr="xs" onClick={handleAddProject}>
          Add a previous project
        </RoundedButton>
        <RoundedButton
          onClick={modal.show}
          as={Modal.Disclose}
          prefix={<Icon icon="plus" />}
        >
          Add a previous project
        </RoundedButton>
      </Padding>

      <PreviousProjectForm modal={modal} />

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
