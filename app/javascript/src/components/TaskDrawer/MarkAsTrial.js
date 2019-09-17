import React from "react";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";
import { Box, Card, Button, Text, Link } from "@advisable/donut";

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

  if (!task.application.trialProgram) {
    return null;
  }

  const trialTask = task.application.trialTask;
  const allowedStages = ["Not Assigned", "Quote Requested", "QuoteProvided"];
  if (trialTask || allowedStages.indexOf(task.stage) === -1) {
    return null;
  }

  const setTrial = value => async () => {
    await update({
      variables: {
        input: {
          id: task.id,
          trial: value,
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        updateTask: {
          __typeName: "UpdateTaskPayload",
          task: {
            ...task,
            trial: value,
          },
        },
      },
    });
  };

  return (
    <Box mt="m" p="m" borderRadius={12} bg="neutral.0">
      <Text fontSize="xs" fontWeight="medium" mb="xxs">
        Would you like to mark this as a guaranteed trial task?
      </Text>
      <Text size="xxs" lineHeight="xs" mb="s" color="neutral.7">
        Proposing a trial task increases your chance of closing a client. You
        will be paid for work completed during this trial as long as you adhere
        to{" "}
        <Link href="#" as="a">
          Advisable's Professional Standards.
        </Link>
      </Text>
      <Button
        size="xs"
        type="button"
        appearance="primary"
        loading={loading}
        onClick={setTrial(true)}
      >
        Mark as trial
      </Button>
    </Box>
  );
};
export default MarkAsTrial;
