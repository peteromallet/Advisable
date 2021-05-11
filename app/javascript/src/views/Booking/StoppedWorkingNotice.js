import React from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { DialogDisclosure, useDialogState } from "reakit/Dialog";
import { Box, Text, Button, Modal } from "@advisable/donut";

export const RESUME_WORKING = gql`
  mutation startWorking($input: StartWorkingInput!) {
    startWorking(input: $input) {
      application {
        id
        status
      }
    }
  }
`;

export default function StoppedWorkingNotice({ firstName, application }) {
  const modal = useDialogState();
  const [loading, setLoading] = React.useState(false);
  const [resumeWorking] = useMutation(RESUME_WORKING);

  const handleResume = async () => {
    setLoading(true);
    await resumeWorking({
      variables: {
        input: {
          application: application.id,
          projectType: application.projectType,
        },
      },
    });
  };

  return (
    <>
      <Modal
        modal={modal}
        padding={8}
        label={`Resume working with ${firstName}`}
      >
        <Text fontSize="3xl" fontWeight="500" lineHeight="1.2" mb={6}>
          Are you sure you want to resume working with {firstName}?
        </Text>
        <Button
          mr={2}
          loading={loading}
          onClick={handleResume}
          aria-label="Resume Project"
        >
          Resume Project
        </Button>
        <Button variant="subtle" onClick={modal.hide}>
          Cancel
        </Button>
      </Modal>
      <Box bg="orange100" padding="l" borderRadius="12px">
        <Text fontSize="l" fontWeight="medium" color="orange900" mb="xs">
          This project has ended
        </Text>
        <Text size="xs" lineHeight="xs" color="neutral700" mb="s">
          You have stopped working with {firstName}. You will not be able to
          action any more tasks for this project until you start working with
          them again.
        </Text>
        <DialogDisclosure {...modal}>
          {(disclosure) => (
            <Button
              {...disclosure}
              type="button"
              variant="dark"
              aria-label="Resume Project"
            >
              Resume Project
            </Button>
          )}
        </DialogDisclosure>
      </Box>
    </>
  );
}
