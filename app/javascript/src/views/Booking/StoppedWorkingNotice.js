import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Box, Text, RoundedButton } from "@advisable/donut";
import Modal from "../../components/Modal";

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
  const [modal, setModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [resumeWorking] = useMutation(RESUME_WORKING);

  const handleResume = async () => {
    setLoading(true);
    await resumeWorking({
      variables: {
        input: {
          application: application.airtableId,
          projectType: application.projectType,
        },
      },
    });
  };

  return (
    <>
      <Modal isOpen={modal}>
        <Box padding="l">
          <Text size="l" lineHeight="l" mb="m">
            Are you sure you want to resume working with {firstName}?
          </Text>
          <RoundedButton
            mr="xs"
            loading={loading}
            onClick={handleResume}
            aria-label="Resume Project"
          >
            Resume Project
          </RoundedButton>
          <RoundedButton variant="subtle" onClick={() => setModal(false)}>
            Cancel
          </RoundedButton>
        </Box>
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
        <RoundedButton
          type="button"
          variant="dark"
          aria-label="Resume Project"
          onClick={() => setModal(true)}
        >
          Resume Project
        </RoundedButton>
      </Box>
    </>
  );
}
