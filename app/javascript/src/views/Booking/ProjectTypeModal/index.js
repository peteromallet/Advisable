// Renders the modal for when the client clicks "start working with X" to create
// a new booking.
import { useMutation } from "@apollo/client";
import { Box, Text } from "@advisable/donut";
import Modal from "../../../components/Modal";
import BookingTypeForm from "../../../components/BookingTypeForm";
import SET_PROJECT_TYPE from "./setProjectType";

const ProjectTypeModal = ({ isOpen, onClose, application }) => {
  const [setProjectType] = useMutation(SET_PROJECT_TYPE, {
    onCompleted: onClose,
  });

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
          application: application.airtableId,
          projectType: values.projectType,
          monthlyLimit: values.monthlyLimit
            ? Number(values.monthlyLimit)
            : null,
        },
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Box padding="l">
        <Text
          as="h4"
          color="neutral900"
          fontWeight="semibold"
          fontSize="xl"
          mb="m"
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
      </Box>
    </Modal>
  );
};

export default ProjectTypeModal;
