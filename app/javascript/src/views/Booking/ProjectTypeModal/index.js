// Renders the modal for when the client clicks "start working with X" to create
// a new booking.
import * as React from "react";
import { useMutation } from "@apollo/client";
import { Text, Modal } from "@advisable/donut";
import BookingTypeForm from "src/components/BookingTypeForm";
import SET_PROJECT_TYPE from "./setProjectType";

const ProjectTypeModal = ({ modal, application }) => {
  const [setProjectType] = useMutation(SET_PROJECT_TYPE);

  const initialValues = {
    projectType: application.projectType,
    monthlyLimit: application.monthlyLimit || "",
    acceptCharges: false,
    acceptUpfrontCharges: false,
  };

  const handleSubmit = async (values) => {
    await setProjectType({
      variables: {
        input: {
          application: application.id,
          projectType: values.projectType,
          monthlyLimit: values.monthlyLimit
            ? Number(values.monthlyLimit)
            : null,
        },
      },
    });

    modal.hide();
  };

  return (
    <>
      <Modal modal={modal} padding={8} label="Update project type">
        <Text
          mb={6}
          as="h4"
          fontSize="3xl"
          fontWeight="500"
          color="neutral900"
          letterSpacing="-0.03rem"
        >
          How do you want to work with {application.specialist.firstName}?
        </Text>
        <BookingTypeForm
          initialValues={initialValues}
          firstName={application.specialist.firstName}
          hourlyRate={application.rate}
          buttonLabel="Update Project Type"
          onSubmit={handleSubmit}
        />
      </Modal>
    </>
  );
};

export default ProjectTypeModal;
