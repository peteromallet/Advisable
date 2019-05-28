// Renders the modal for when the client clicks "start working with X" to create
// a new booking.
import * as React from "react";
import { Mutation } from "react-apollo";
import ProjectTypeModal from "../ProjectTypeModal";
import START_WORKING from "./startWorking.graphql";

const CreateBookingModal = ({
  isOpen,
  onClose,
  firstName,
  applicationId,
  onCreate,
}) => {
  return (
    <Mutation mutation={START_WORKING}>
      {startWorking => (
        <ProjectTypeModal
          isOpen={isOpen}
          onClose={onClose}
          firstName={firstName}
          initialValues={{ projectType: undefined }}
          onSubmit={async values => {
            const response = await startWorking({
              variables: {
                input: {
                  application: applicationId,
                  projectType: values.projectType,
                },
              },
            });

            const { errors, application } = response.data.startWorking;

            if (!errors) {
              onCreate(application);
            }
          }}
        />
      )}
    </Mutation>
  );
};

export default CreateBookingModal;
