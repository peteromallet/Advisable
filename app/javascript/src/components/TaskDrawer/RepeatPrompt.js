// Renders the prompt to repeat a task.
import React from "react";
import { DateTime } from "luxon";
import { Button } from "@advisable/donut";
import { useMutation } from "@apollo/react-hooks";
import Text from "../Text";
import Padding from "../Spacing/Padding";
import CREATE_TASK from "../../graphql/mutations/createTask";
import { Confirmation, ConfirmationContainer } from "./styles";

const RepeatPrompt = ({ task, onRepeat, onClose }) => {
  const [loading, setLoading] = React.useState(false);
  const [createTask] = useMutation(CREATE_TASK);

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
          estimateType: task.estimateType,
          flexibleEstimate: task.flexibleEstimate,
          dueDate: DateTime.fromISO(task.dueDate)
            .plus({ months: 1 })
            .toISODate(),
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
        <Button loading={loading} onClick={handleRepeat} mr="xs">
          Yes
        </Button>
        <Button onClick={onClose} variant="subtle">
          No
        </Button>
      </ConfirmationContainer>
    </Confirmation>
  );
};

export default RepeatPrompt;
