import * as React from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  Card,
  Text,
  RoundedButton,
  DialogDisclosure,
  Icon,
} from "@advisable/donut";
import Loading from "../../../components/Loading";
import useViewer from "../../../hooks/useViewer";
import PreviousProjects from "../../../components/PreviousProjects";
import PREVIOUS_PROJECTS from "./previousProjects";
import PreviousProjectFormModal, {
  usePreviousProjectModal,
} from "../../../components/PreviousProjectFormModal";

const References = () => {
  const viewer = useViewer();
  const { data, loading } = useQuery(PREVIOUS_PROJECTS);
  const modal = usePreviousProjectModal("/previous_projects/new");

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
        mb="xl"
        as={RoundedButton}
        prefix={<Icon icon="plus" />}
        {...modal}
      >
        Add a previous project
      </DialogDisclosure>

      <PreviousProjectFormModal specialistId={viewer.id} modal={modal} />

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
