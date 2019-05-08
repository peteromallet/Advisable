// Renders the prompt to repeat a task.
import React from "react";
import moment from "moment";
import { graphql } from "react-apollo";
import Text from "../Text";
import Button from "../Button";
import ButtonGroup from "../ButtonGroup";
import Padding from "../Spacing/Padding";
import CREATE_TASK from "../../graphql/mutations/createTask";
import { Confirmation, ConfirmationContainer } from "./styles";

const RepeatPrompt = ({ task, onRepeat, onClose, createTask }) => {
  const [loading, setLoading] = React.useState(false);
  const handleRepeat = async () => {
    setLoading(true);
    const response = await createTask({
      variables: {
        input: {
          application: task.application.airtableId,
          name: task.name,
          description: task.description,
          estimate: task.estimate,
          repeat: task.repeat,
          dueDate: moment(task.dueDate).add(1, "month"),
        },
      },
    });
    onRepeat(response.data.createTask.task);
  };

  return (
    <Confirmation>
      <ConfirmationContainer>
        <Padding bottom="s">
          <Text weight="semibold" colour="dark">
            Repeating Task
          </Text>
        </Padding>
        <Padding bottom="l">
          <Text size="s">
            This has been marked as a repeating task. Do you want to repeat it
            for another month?
          </Text>
        </Padding>
        <ButtonGroup fullWidth>
          <Button loading={loading} onClick={handleRepeat} styling="primary">
            Yes
          </Button>
          <Button onClick={onClose}>No</Button>
        </ButtonGroup>
      </ConfirmationContainer>
    </Confirmation>
  );
};

export default graphql(CREATE_TASK, { name: "createTask" })(RepeatPrompt);
