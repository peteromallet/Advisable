// Renders the prompt to submit a task
import React from "react";
import { useMutation } from "@apollo/react-hooks";
import Text from "../Text";
import Slider from "../Slider";
import Button from "../Button";
import Heading from "../Heading";
import ButtonGroup from "../ButtonGroup";
import Padding from "../Spacing/Padding";
import SUBMIT_TASK from "./submitTask";
import currency from "../../utilities/currency";
import { Confirmation, ConfirmationContainer } from "./styles";

// The submit prompt can have two steps. First we show a prompt where the user
// confirms they have already approved the task with the client. Then, if the
// task has a flexible estimate we capture the hours worked.
const CONFIRM_APPROVED = "CONFIRM_APPROVED";
const HOURS_WORKED = "HOURS_WORKED";

const SubmitPrompt = ({ task, onClose, onSubmit }) => {
  const [loading, setLoading] = React.useState(false);
  const [step, setStep] = React.useState(CONFIRM_APPROVED);
  const [submitTask] = useMutation(SUBMIT_TASK);
  const [estimate, setCost] = React.useState(
    (Number(task.estimate) + Number(task.flexibleEstimate || task.estimate)) /
      2,
  );

  const handleConfirmApproved = () => {
    if (Boolean(task.flexibleEstimate)) {
      setStep(HOURS_WORKED);
    } else {
      submit();
    }
  };

  const isFixedPricing = task.estimateType === "Fixed";

  const submit = async () => {
    setLoading(true);

    let finalCost = Number(estimate);

    if (!isFixedPricing) {
      finalCost = task.application.rate * Number(estimate) * 100;
    }

    const response = await submitTask({
      variables: {
        input: {
          task: task.id,
          finalCost: finalCost,
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
                Before you mark this as complete, please make sure that you've
                completed this batch of work and the client has already approved
                it.
              </Text>
            </Padding>
            <ButtonGroup fullWidth>
              <Button
                styling="primary"
                loading={loading}
                aria-label={
                  Boolean(task.flexibleEstimate) ? "Continue" : "Complete"
                }
                onClick={handleConfirmApproved}
              >
                {Boolean(task.flexibleEstimate) ? "Continue" : "Complete"}
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ButtonGroup>
          </>
        )}
        {step === HOURS_WORKED && (
          <>
            <Padding bottom="s">
              <Text weight="semibold" colour="dark">
                {isFixedPricing ? (
                  <>How much did this project cost?</>
                ) : (
                  <>How many hours did this take you?</>
                )}
              </Text>
            </Padding>
            <Padding bottom="l">
              <Text size="s">
                {isFixedPricing ? (
                  <>
                    This task had a flexible estimate, how much did it end up
                    costing?
                  </>
                ) : (
                  <>
                    This task had a flexible estimate, how many hours did you
                    end up spending on the task?
                  </>
                )}
              </Text>
            </Padding>
            <Padding bottom="m">
              <Heading size="m">
                {isFixedPricing ? currency(estimate) : estimate}
              </Heading>
              <Text>
                {task.estimateType === "Fixed" ? "Cost" : "Hours Worked"}
              </Text>
            </Padding>
            <Padding bottom="xl">
              <Slider
                labelHidden
                value={estimate}
                min={task.estimate}
                label="Hours Worked"
                max={task.flexibleEstimate}
                step={isFixedPricing ? "5000" : "1"}
                onChange={(e) => setCost(e.target.value)}
              />
            </Padding>
            <ButtonGroup fullWidth>
              <Button
                styling="primary"
                loading={loading}
                onClick={submit}
                aria-label="Complete"
              >
                Complete
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ButtonGroup>
          </>
        )}
      </ConfirmationContainer>
    </Confirmation>
  );
};

export default SubmitPrompt;
