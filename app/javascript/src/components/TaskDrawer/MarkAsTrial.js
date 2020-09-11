import React from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { Box, Button, Text, Link } from "@advisable/donut";

export const UPDATE_TASK = gql`
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
  const [update, { loading }] = useMutation(UPDATE_TASK);

  if (!task.application.trialProgram) {
    return null;
  }

  const trialTask = task.application.trialTask;
  const allowedStages = ["Not Assigned", "Quote Requested", "QuoteProvided"];
  if (trialTask || allowedStages.indexOf(task.stage) === -1) {
    return null;
  }

  const setTrial = (value) => async () => {
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
          __typename: "UpdateTaskPayload",
          task: {
            ...task,
            trial: value,
          },
        },
      },
    });
  };

  return (
    <Box mt="m" p="m" borderRadius={12} bg="neutral100">
      <Text fontSize="s" fontWeight="medium" mb="xxs">
        Would you like to mark this as a guaranteed trial task?
      </Text>
      <Text fontSize="xs" lineHeight="xs" mb="xs" color="neutral700">
        Proposing a trial task increases your chance of closing a client. It
        gives the client a chance to work with you risk-free: they don't pay
        unless they want to continue working with you after. However, you will
        be paid for work completed during this trial as long as you adhere to
        Advisable's Professional Standards.
      </Text>
      <Box mb="s">
        <Text size="xs">
          <Link.External
            href="https://advisable.com/freelancer-trial"
            target="_blank"
          >
            Read more details
          </Link.External>
        </Text>
      </Box>
      <Button
        size="s"
        variant="dark"
        type="button"
        loading={loading}
        onClick={setTrial(true)}
      >
        Set as trial task
      </Button>
    </Box>
  );
};
export default MarkAsTrial;
