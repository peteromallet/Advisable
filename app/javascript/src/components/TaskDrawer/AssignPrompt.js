// Renders the prompt to assign a task
import React from "react";
import { graphql } from "react-apollo";
import Text from "../Text";
import Button from "../Button";
import ButtonGroup from "../ButtonGroup";
import Padding from "../Spacing/Padding";
import ASSIGN_TASK from "./assignTask.graphql";
import { Confirmation, ConfirmationContainer } from "./styles";

const AssignPrompt = ({ task, onClose, onAssign, assignTask }) => {
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
        <ButtonGroup fullWidth>
          <Button loading={loading} onClick={handleAssign} styling="primary">
            Assign
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ButtonGroup>
      </ConfirmationContainer>
    </Confirmation>
  );
};

export default graphql(ASSIGN_TASK, { name: "assignTask" })(AssignPrompt);
