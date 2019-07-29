import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Box, Text, Button } from "@advisable/donut";
import Modal from "../../components/Modal";
import Notice from "../../components/Notice";

const RESUME_WORKING = gql`
  mutation startWorking($input: StartWorkingInput!) {
    startWorking(input: $input) {
      application {
        id
        status
      }
    }
  }
`;

const StoppedWorkingNotice = ({ firstName, application, resumeWorking }) => {
  const [modal, setModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

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
          <Button
            mr="xs"
            intent="success"
            loading={loading}
            appearance="primary"
            onClick={handleResume}
          >
            Resume Project
          </Button>
          <Button onClick={() => setModal(false)}>Cancel</Button>
        </Box>
      </Modal>
      <Notice icon="info" elevation="s">
        <Text size="s" weight="medium" color="neutral.9" mb="xxs">
          This project has ended
        </Text>
        <Text size="xs" lineHeight="xs" color="neutral.5" mb="s">
          You have stopped working with {firstName}. You will not be able to
          action any more tasks for this project until you start working with
          them again.
        </Text>
        <Button type="button" onClick={() => setModal(true)}>
          Resume Project
        </Button>
      </Notice>
    </>
  );
};

export default graphql(RESUME_WORKING, { name: "resumeWorking" })(
  StoppedWorkingNotice
);
