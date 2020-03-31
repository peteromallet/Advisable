// Renders the prompt to submit a task
import React from "react";
import { useMutation } from "@apollo/react-hooks";
import Text from "../Text";
import Button from "../Button";
import ButtonGroup from "../ButtonGroup";
import Padding from "../Spacing/Padding";
import DELETE_TASK from "./deleteTask.graphql";
import { Confirmation, ConfirmationContainer } from "./styles";

const DeletePrompt = ({ task, onClose, onDelete }) => {
  const [loading, setLoading] = React.useState(false);
  const [deleteTask] = useMutation(DELETE_TASK);

  const handleDelete = async () => {
    setLoading(true);
    const response = await deleteTask({
      variables: {
        input: {
          task: task.id,
        },
      },
    });
    setLoading(false);
    onDelete(response.data.deleteTask.task);
  };

  return (
    <Confirmation>
      <ConfirmationContainer>
        <Padding bottom="l">
          <Text weight="semibold" colour="dark">
            Are you sure you want to delete this task?
          </Text>
        </Padding>
        <ButtonGroup fullWidth>
          <Button loading={loading} onClick={handleDelete} styling="danger">
            Delete
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ButtonGroup>
      </ConfirmationContainer>
    </Confirmation>
  );
};

export default DeletePrompt;
