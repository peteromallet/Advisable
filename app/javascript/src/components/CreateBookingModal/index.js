// Renders the modal for when the client clicks "start working with X" to create
// a new booking.
import * as React from "react";
import { useMutation } from "react-apollo";
import ProjectTypeModal from "../ProjectTypeModal";
import START_WORKING from "./startWorking";

const CreateBookingModal = ({ isOpen, onClose, application, onCreate }) => {
  const [startWorking] = useMutation(START_WORKING);

  const handleSubmit = async values => {
    const { data } = await startWorking({
      variables: {
        input: {
          application: application.airtableId,
          projectType: values.projectType,
          monthlyLimit: values.monthlyLimit,
        },
      },
    });

    const a = data.startWorking.application;
    onCreate(a);
  };

  return (
    <ProjectTypeModal
      isOpen={isOpen}
      onClose={onClose}
      application={application}
      onSubmit={handleSubmit}
    />
  );
};

export default CreateBookingModal;
