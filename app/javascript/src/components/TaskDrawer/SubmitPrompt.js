// Renders the prompt to submit a task
import React from "react";
import { graphql } from "react-apollo";
import Text from "../Text";
import Slider from "../Slider";
import Button from "../Button";
import Heading from "../Heading";
import ButtonGroup from "../ButtonGroup";
import Padding from "../Spacing/Padding";
import SUBMIT_TASK from "./submitTask.graphql";
import { Confirmation, ConfirmationContainer } from "./styles";

// The submit prompt can have two steps. First we show a prompt where the user
// confirms they have already approved the task with the client. Then, if the
// task has a flexible estimate we capture the hours worked.
const CONFIRM_APPROVED = "CONFIRM_APPROVED";
const HOURS_WORKED = "HOURS_WORKED";

const SubmitPrompt = ({ task, onClose, onSubmit, submitTask }) => {
  const [loading, setLoading] = React.useState(false);
  const [step, setStep] = React.useState(CONFIRM_APPROVED);
  const [hours, setHours] = React.useState(
    (Number(task.estimate) + Number(task.flexibleEstimate || task.estimate)) / 2
  );

  const handleConfirmApproved = () => {
    if (Boolean(task.flexibleEstimate)) {
      setStep(HOURS_WORKED);
    } else {
      submit();
    }
  };

  const submit = async () => {
    setLoading(true);
    const response = await submitTask({
      variables: {
        input: {
          task: task.id,
          hoursWorked: parseInt(hours),
        },
      },
    });
    setLoading(false);
    onSubmit(response.data.submitTask.task);
  };

  return (
    <Confirmation>
      <ConfirmationContainer>
        {step === CONFIRM_APPROVED && (
          <>
            <Padding bottom="s">
              <Text weight="semibold" colour="dark">
                Is the work approved?
              </Text>
            </Padding>
            <Padding bottom="l">
              <Text size="s">
                Before you submit this, please make sure that you've completed
                this batch of work and the client has already approved it.
              </Text>
            </Padding>
            <ButtonGroup fullWidth>
              <Button
                styling="primary"
                loading={loading}
                onClick={handleConfirmApproved}
              >
                {Boolean(task.flexibleEstimate) ? "Continue" : "Submit"}
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ButtonGroup>
          </>
        )}
        {step === HOURS_WORKED && (
          <>
            <Padding bottom="s">
              <Text weight="semibold" colour="dark">
                How many hours did this take you?
              </Text>
            </Padding>
            <Padding bottom="l">
              <Text size="s">
                This task had a flexible estimate, how many hours did you end up
                spending on the task?
              </Text>
            </Padding>
            <Padding bottom="m">
              <Heading size="m">{hours}</Heading>
              <Text>Hours</Text>
            </Padding>
            <Padding bottom="xl">
              <Slider
                value={hours}
                onChange={e => setHours(e.target.value)}
                min={task.estimate}
                max={task.flexibleEstimate}
              />
            </Padding>
            <ButtonGroup fullWidth>
              <Button styling="primary" loading={loading} onClick={submit}>
                Submit
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ButtonGroup>
          </>
        )}
      </ConfirmationContainer>
    </Confirmation>
  );
};

export default graphql(SUBMIT_TASK, { name: "submitTask" })(SubmitPrompt);
