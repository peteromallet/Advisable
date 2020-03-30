// Renders all of the previous projects for a specialist
import * as React from "react";
import { useQuery } from "@apollo/react-hooks";
import Modal from "../Modal";
import Loading from "../Loading";
import Heading from "../Heading";
import PreviousProject from "../PreviousProject";
import FETCH_PREVIOUS_PROJECTS from "./fetchPreviousProjects.graphql";

interface Props {
  specialistId: string;
  isOpen: boolean;
  onClose: (open: boolean) => void;
}

const PreviousProjectsModal = (props: Props) => {
  const { data, loading } = useQuery(FETCH_PREVIOUS_PROJECTS, {
    variables: {
      id: props.specialistId,
    },
  });

  return (
    <Modal
      size="l"
      isOpen={props.isOpen}
      onClose={props.onClose}
      expandOnMobile
    >
      {loading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <Modal.Header>
            <Heading>All Previous Project's</Heading>
          </Modal.Header>
          <Modal.Body>
            {data.specialist.previousProjects.map((previousProject) => (
              <PreviousProject
                key={previousProject.project.id}
                specialistId={props.specialistId}
                previousProject={previousProject}
              />
            ))}
          </Modal.Body>
        </React.Fragment>
      )}
    </Modal>
  );
};

export default PreviousProjectsModal;
