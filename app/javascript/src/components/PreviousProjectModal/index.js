// Fetches and renders a previous project inside a modal.
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import Modal from "src/components/Modal";
import Loading from "src/components/Loading";
import ProjectDetails from "./ProjectDetails";
import FETCH_PROJECT from "./fetchProject.graphql";

const PreviousProjectModal = ({ isOpen, onClose, id, type, specialistId }) => {
  const { data, loading, error } = useQuery(FETCH_PROJECT, {
    variables: { id, type, specialistId },
    skip: !isOpen,
  });

  if (error) {
    return <div>something went wrong</div>;
  }

  return (
    <Modal size="l" isOpen={isOpen} onClose={onClose} expandOnMobile>
      {loading ? (
        <Loading />
      ) : (
        <ProjectDetails previousProject={data?.previousProject} />
      )}
    </Modal>
  );
};

export default PreviousProjectModal;
