// Fetches and renders a previous project inside a modal.
import React from "react";
import { Query } from "react-apollo";
import Modal from "src/components/Modal";
import Loading from "src/components/Loading";
import ProjectDetails from "./ProjectDetails";
import FETCH_PROJECT from "./fetchProject.graphql";

const PreviousProjectModal = ({ isOpen, onClose, id, type, specialistId }) => {
  return (
    <Modal size="l" isOpen={isOpen} onClose={onClose} expandOnMobile>
      <Query query={FETCH_PROJECT} variables={{ id, type, specialistId }}>
        {query => {
          if (query.loading) return <Loading />;

          return <ProjectDetails project={query.data.previousProject} />;
        }}
      </Query>
    </Modal>
  );
};

export default PreviousProjectModal;
