import * as React from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  Card,
  Text,
  RoundedButton,
  useModal,
  DialogDisclosure,
  useRoutedModal,
  Icon,
} from "@advisable/donut";
import Loading from "../../../components/Loading";
import PreviousProjects from "../../../components/PreviousProjects";
import PreviousProjectForm from "../../../components/PreviousProjectForm";
import PREVIOUS_PROJECTS from "./previousProjects";
import PreviousProjectFormModal, {
  usePreviousProjectModal,
} from "../../../components/PreviousProjectFormModal";

const References = () => {
  const { data, loading } = useQuery(PREVIOUS_PROJECTS);
  // const modal = useRoutedModal("/profile/references/new_project/client", {
  //   returnLocation: "/profile/references",
  // });

  const modal = usePreviousProjectModal();

  if (loading) return <Loading />;

  return (
    <>
      <Text
        as="h2"
        color="blue900"
        fontSize="28px"
        fontWeight="semibold"
        letterSpacing="-0.02em"
        mb="s"
      >
        Previous Projects
      </Text>
      <Text lineHeight="m" color="neutral800" mb="l">
        Previous projects are one of the most effective ways to validate your
        skills and experience. Advisable uses them to decide who to invite to
        our platform, which projects to invite them to and gives you the
        opportunity to share them with clients when you’re applying for
        projects.
      </Text>

      <DialogDisclosure
        as={RoundedButton}
        mb="xl"
        prefix={<Icon icon="plus" />}
        {...modal}
      >
        Add a previous project
      </DialogDisclosure>

      <PreviousProjectFormModal modal={modal} />

      {/* <PreviousProjectForm
        modal={modal}
        specialist={data.viewer.id}
        pathPrefix="/profile/references"
        mutationUpdate={(proxy, response) => {
          const data = proxy.readQuery({ query: PREVIOUS_PROJECTS });
          const project = response.data.createPreviousProject.previousProject;
          data.viewer.previousProjects.nodes.unshift(project);
          proxy.writeQuery({ query: PREVIOUS_PROJECTS, data });
        }}
      /> */}

      <Card px="l">
        <PreviousProjects
          loading={data.loading}
          specialistId={data.viewer.airtableId}
          previousProjects={data?.viewer.previousProjects.nodes}
        />
      </Card>
    </>
  );
};

export default References;
