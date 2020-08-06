// Renders the prompt to assign a task
import React from "react";
import { useMutation } from "@apollo/client";
import { Button, Box } from "@advisable/donut";
import Text from "../Text";
import ASSIGN_TASK from "./assignTask.graphql";
import { Confirmation, ConfirmationContainer } from "./styles";

const AssignPrompt = ({ task, onClose, onAssign }) => {
  const [assignTask] = useMutation(ASSIGN_TASK);
  const [loading, setLoading] = React.useState(false);

  const handleAssign = async () => {
    setLoading(true);
    const response = await assignTask({
      variables: {
        input: {
          task: task.id,
        },
      },
    });
    setLoading(false);
    onAssign(response.data.assignTask.task);
  };

  const hasQuote = Boolean(task.estimate);

  return (
    <Confirmation>
      <ConfirmationContainer>
        <Box paddingBottom="s">
          <Text weight="semibold" colour="dark">
            Assign Task
          </Text>
        </Box>
        <Box paddingBottom="l">
          <Text size="s">
            You will not be able to modify this task after it is assigned. You
            can add additional tasks if more work needs to be done.
          </Text>
        </Box>
        {!hasQuote && (
          <Box paddingBottom="l">
            <Text size="s">
              This task has no estimate. You may want to request a quote first.
            </Text>
          </Box>
        )}
        <Button loading={loading} onClick={handleAssign} mr="xs">
          Assign
        </Button>
        <Button onClick={onClose} variant="subtle">
          Cancel
        </Button>
      </ConfirmationContainer>
    </Confirmation>
  );
};

export default AssignPrompt;
