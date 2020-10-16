// Displays the prompt for when a client approves a task.
import { useState } from "react";
import { useMutation } from "@apollo/client";
import Text from "../Text";
import { Button, Box } from "@advisable/donut";
import { Confirmation, ConfirmationContainer } from "./styles";
import APPROVE_TASK from "./approveTask.graphql";

const ApprovePrompt = ({ task, onClose, onApprove }) => {
  const [loading, setLoading] = useState(false);
  const [approveTask] = useMutation(APPROVE_TASK);

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
        <Box paddingBottom="s">
          <Text weight="semibold" colour="dark">
            Approve Work
          </Text>
        </Box>
        <Box paddingBottom="l">
          <Text size="s">
            Once you approve the work, the freelancer will be paid for this
            task. If you have any issues, please make sure to resolve them in
            advance.
          </Text>
        </Box>
        <Button loading={loading} onClick={handleSubmit} mr="xs">
          Approve
        </Button>
        <Button onClick={onClose} variant="subtle">
          Cancel
        </Button>
      </ConfirmationContainer>
    </Confirmation>
  );
};

export default ApprovePrompt;
