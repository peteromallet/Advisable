import React from "react";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";
import { Box, Button, Text, Link } from "@advisable/donut";

const UPDATE = gql`
  mutation updateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      task {
        id
        trial
        application {
          id
          trialTask {
            id
            stage
          }
        }
      }
    }
  }
`;

const MarkAsTrial = ({ task }) => {
  const [update, { loading }] = useMutation(UPDATE);

  const trialTask = task.application.trialTask;
  const allowedStages = ["Not Assigned", "Quote Requested", "QuoteProvided"];
  if (trialTask || allowedStages.indexOf(task.stage) === -1) {
    return null;
  }

  const handleClick = async () => {
    await update({
      variables: {
        input: {
          id: task.id,
          trial: true,
        },
      },
    });
  };

  return (
    <Box m="m" p="m" borderRadius={12} bg="neutral.0">
      <Text fontSize="s" fontWeight="medium" mb="xs">
        Would you like to mark this as a guaranteed trial task?
      </Text>
      <Text size="xs" lineHeight="xs" mb="s">
        Proposing a trial task increases your chance of closing a client. You
        will be paid for work completed during this trial as long as you adhere
        to{" "}
        <Link href="#" as="a">
          Advisable's Professional Standards.
        </Link>
      </Text>
      <Button
        size="s"
        type="button"
        loading={loading}
        appearance="primary"
        onClick={handleClick}
      >
        Create trial task
      </Button>
    </Box>
  );
};
export default MarkAsTrial;
