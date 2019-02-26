// Renders all of the previous projects for a specialist
import * as React from "react";
import { Query } from "react-apollo";
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
  return (
    <Query
      query={FETCH_PREVIOUS_PROJECTS}
      variables={{ id: props.specialistId }}
    >
      {query => (
        <Modal size="l" isOpen={props.isOpen} onClose={props.onClose} expandOnMobile>
          {query.loading ? (
            <Loading />
          ) : (
            <React.Fragment>
              <Modal.Header>
                <Heading>All Previous Project's</Heading>
              </Modal.Header>
              <Modal.Body>
                {query.data.specialist.previousProjects.map(previousProject => (
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
      )}
    </Query>
  );
};

export default PreviousProjectsModal;
