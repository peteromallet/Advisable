// Renders the prompt to assign a task
import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button } from "@advisable/donut";
import Text from "../Text";
import Padding from "../Spacing/Padding";
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
        <Padding bottom="s">
          <Text weight="semibold" colour="dark">
            Assign Task
          </Text>
        </Padding>
        <Padding bottom="l">
          <Text size="s">
            You will not be able to modify this task after it is assigned. You
            can add additional tasks if more working needs to be done.
          </Text>
        </Padding>
        {!hasQuote && (
          <Padding bottom="l">
            <Text size="s">
              This task has no estimate. You may want to request a quote first.
            </Text>
          </Padding>
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
