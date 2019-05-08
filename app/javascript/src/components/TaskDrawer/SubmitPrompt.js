// Renders the prompt to submit a task
import React from "react";
import { graphql } from "react-apollo";
import Text from "../Text";
import Button from "../Button";
import ButtonGroup from "../ButtonGroup";
import Padding from "../Spacing/Padding";
import SUBMIT_TASK from "./submitTask.graphql";
import { Confirmation, ConfirmationContainer } from "./styles";

const SubmitPrompt = ({ task, onClose, onSubmit, submitTask }) => {
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const response = await submitTask({
      variables: {
        input: {
          task: task.id,
        },
      },
    });
    setLoading(false);
    onSubmit(response.data.submitTask.task);
  };

  return (
    <Confirmation>
      <ConfirmationContainer>
        <Padding bottom="s">
          <Text weight="semibold" colour="dark">
            Is the work approved?
          </Text>
        </Padding>
        <Padding bottom="l">
          <Text size="s">
            Before you submit this, please make sure that you've completed this
            batch of work and the client has already approved it.
          </Text>
        </Padding>
        <ButtonGroup fullWidth>
          <Button loading={loading} onClick={handleSubmit} styling="primary">
            Submit
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ButtonGroup>
      </ConfirmationContainer>
    </Confirmation>
  );
};

export default graphql(SUBMIT_TASK, { name: "submitTask" })(SubmitPrompt);
