import * as React from "react";
import { get } from "lodash";
import { graphql } from "react-apollo";
import {
  Text,
  RoundedButton,
  Modal,
  useRoutedModal,
  Icon,
} from "@advisable/donut";
import Loading from "../../../components/Loading";
import PreviousProjects from "../../../components/PreviousProjects";
import PreviousProjectForm from "../../../components/PreviousProjectForm";
import PREVIOUS_PROJECTS from "./previousProjects";

const References = ({ data }) => {
  const modal = useRoutedModal("/profile/references/new_project/client", {
    returnLocation: "/profile/references",
  });

  if (data.loading) return <Loading />;

  return (
    <>
      <Text as="h2" fontSize="xxl" fontWeight="semibold" mb="s">
        Previous Projects
      </Text>
      <Text fontSize="s" lineHeight="s" color="neutral.7" mb="l">
        Previous projects are one of the most effective ways to validate your
        skills and experience. Advisable uses them to decide who to invite to
        our platform, which projects to invite them to and gives you the
        opportunity to share them with clients when you’re applying for projects
      </Text>

      <RoundedButton
        mb="xl"
        onClick={modal.show}
        as={Modal.Disclose}
        prefix={<Icon icon="plus" />}
      >
        Add a previous project
      </RoundedButton>

      <PreviousProjectForm
        modal={modal}
        specialist={data.viewer.id}
        pathPrefix="/profile/references"
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
    </>
  );
};

export default graphql(PREVIOUS_PROJECTS)(References);
