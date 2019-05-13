// Displays the prompt for when a client approves a task.
import React from "react";
import { graphql } from "react-apollo";
import Text from "../Text";
import Button from "../Button";
import ButtonGroup from "../ButtonGroup";
import Padding from "../Spacing/Padding";
import { Confirmation, ConfirmationContainer } from "./styles";
import APPROVE_TASK from "./approveTask.graphql";

const ApprovePrompt = ({ task, onClose, onApprove, approveTask }) => {
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await approveTask({
      variables: {
        input: {
          task: task.id,
        },
      },
    });
    setLoading(false);
    onApprove();
  };

  return (
    <Confirmation>
      <ConfirmationContainer>
        <Padding bottom="s">
          <Text weight="semibold" colour="dark">
            Approve Work
          </Text>
        </Padding>
        <Padding bottom="l">
          <Text size="s">
            Once you approve the work, the freelancer will be paid for this
            task. If you have any issues, please make sure to resolve them in
            advance.
          </Text>
        </Padding>
        <ButtonGroup fullWidth>
          <Button loading={loading} onClick={handleSubmit} styling="primary">
            Approve
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ButtonGroup>
      </ConfirmationContainer>
    </Confirmation>
  );
};

export default graphql(APPROVE_TASK, { name: "approveTask" })(ApprovePrompt);
