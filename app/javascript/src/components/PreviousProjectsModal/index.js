// Renders all of the previous projects for a specialist
import * as React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Modal, Text } from "@advisable/donut";
import Loading from "../Loading";
import PreviousProject from "../PreviousProject";
import FETCH_PREVIOUS_PROJECTS from "./fetchPreviousProjects";

const PreviousProjectsModal = (props) => {
  const { data, loading, error } = useQuery(FETCH_PREVIOUS_PROJECTS, {
    variables: {
      id: props.specialistId,
    },
    skip: props.modal.visible === false,
  });

  return (
    <Modal
      width={800}
      padding="xl"
      modal={props.modal}
      label="All previous projects"
    >
      {loading && <Loading />}
      {!loading && data && (
        <>
          <Text
            color="blue900"
            fontSize="28px"
            fontWeight="semibold"
            mb="m"
            letterSpacing="-0.01em"
          >
            All Previous Project's
          </Text>
          {data.specialist.previousProjects.nodes.map((previousProject) => (
            <PreviousProject
              key={previousProject.id}
              previousProject={previousProject}
              modalProps={{ backdrop: false }}
            />
          ))}
        </>
      )}
    </Modal>
  );
};

export default PreviousProjectsModal;
