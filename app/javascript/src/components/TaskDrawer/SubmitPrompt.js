// Renders the prompt to submit a task
import React from "react";
import { useMutation } from "@apollo/client";
import { Box, Columns, Button, Text } from "@advisable/donut";
import Slider from "../Slider";
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
    if (task.flexibleEstimate) {
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
      finalCost = task.application.invoiceRate * Number(estimate);
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
    <Confirmation body-scroll-lock-ignore>
      <ConfirmationContainer>
        {step === CONFIRM_APPROVED && (
          <>
            <Box paddingBottom="s">
              <Text fontWeight="500" color="neutral900">
                Is the work approved?
              </Text>
            </Box>
            <Box paddingBottom="l">
              <Text fontSize="sm" lineHeight="1.2">
                Before you mark this as complete, please make sure that
                you&apos;ve completed this batch of work and the client has
                already approved it.
              </Text>
            </Box>
            <Columns spacing="xs">
              <Button
                width="100%"
                styling="primary"
                loading={loading}
                aria-label={task.flexibleEstimate ? "Continue" : "Complete"}
                onClick={handleConfirmApproved}
              >
                {task.flexibleEstimate ? "Continue" : "Complete"}
              </Button>
              <Button width="100%" variant="subtle" onClick={onClose}>
                Cancel
              </Button>
            </Columns>
          </>
        )}
        {step === HOURS_WORKED && (
          <>
            <Box paddingBottom="s">
              <Text fontSize="lg" fontWeight="500" color="neutral900">
                {isFixedPricing ? (
                  <>How much did this project cost?</>
                ) : (
                  <>How many hours did this take you?</>
                )}
              </Text>
            </Box>
            <Box paddingBottom="l">
              <Text fontSize="sm">
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
            </Box>
            <Box paddingBottom="m">
              <Text
                fontSize="xl"
                lineHeight="m"
                color="neutral900"
                fontWeight="semibold"
                letterSpacing="-0.015em"
              >
                {isFixedPricing ? currency(estimate) : estimate}
              </Text>
              <Text>
                {task.estimateType === "Fixed" ? "Cost" : "Hours Worked"}
              </Text>
            </Box>
            <Box paddingBottom="xl">
              <Slider
                labelHidden
                value={estimate}
                min={task.estimate}
                label="Hours Worked"
                max={task.flexibleEstimate}
                step={isFixedPricing ? "100" : "1"}
                onChange={(e) => setCost(e.target.value)}
              />
            </Box>
            <Columns spacing="xs">
              <Button
                width="100%"
                styling="primary"
                loading={loading}
                onClick={submit}
                aria-label="Complete"
              >
                Complete
              </Button>
              <Button width="100%" onClick={onClose} variant="subtle">
                Cancel
              </Button>
            </Columns>
          </>
        )}
      </ConfirmationContainer>
    </Confirmation>
  );
};

export default SubmitPrompt;
