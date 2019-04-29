import * as React from "react";
import { compose, graphql } from "react-apollo";
import Text from "../Text";
import Button from "../Button";
import ButtonGroup from "../ButtonGroup";
import Padding from "../Spacing/Padding";
import START_TASK from "./startTask.graphql";
import ASSIGN_TASK from "./assignTask.graphql";
import SUBMIT_TASK from "./submitTask.graphql";
import APPROVE_TASK from "./approveTask.graphql";
import REQUEST_QUOTE from "./requestQuote.graphql";
import { useMobile } from "../../components/Breakpoint";
import { Confirmation, ConfirmationContainer } from "./styles";

const Component = ({
  task,
  isClient,
  startTask,
  submitTask,
  assignTask,
  approveTask,
  requestQuote,
}) => {
  const isMobile = useMobile();
  const [loading, setLoading] = React.useState(null);
  const [confirmation, setConfirmation] = React.useState(null);
  const { stage } = task;

  const handleRequestQuote = async () => {
    setLoading("REQUEST_QUOTE");
    await requestQuote({
      variables: {
        input: {
          task: task.id,
        },
      },
    });
    setLoading(null);
  };

  const handleAssign = async () => {
    setLoading("ASSIGN");
    await assignTask({
      variables: {
        input: {
          task: task.id,
        },
      },
    });
    setConfirmation(null);
    setLoading(null);
  };

  const handleStartTask = async () => {
    setLoading("START_WORKING");
    await startTask({
      variables: {
        input: {
          task: task.id,
        },
      },
    });

    setLoading(null);
  };

  const handleSubmitTask = async () => {
    setLoading("SUBMIT");
    await submitTask({
      variables: {
        input: {
          task: task.id,
        },
      },
    });
    setLoading(null);
  };

  const handleApproveTask = async () => {
    setLoading("APPROVE");
    await approveTask({
      variables: {
        input: {
          task: task.id,
        },
      },
    });
    setLoading(null);
  };

  let actions = [];
  const hasQuote = Boolean(task.estimate);
  const hasDueDate = Boolean(task.dueDate);
  const hasName = Boolean(task.name);
  const hasDescription = Boolean(task.description)
  const hasNameAndDescription = hasName && hasDescription;

  if (isClient && stage === "Not Assigned") {
    if (!hasQuote) {
      actions.push(
        <Button
          key="quote"
          styling="primary"
          disabled={!hasNameAndDescription || loading}
          onClick={handleRequestQuote}
          loading={loading === "REQUEST_QUOTE"}
        >
          Request Quote
        </Button>
      );
    }

    actions.push(
      <Button
        key="quote"
        disabled={!hasNameAndDescription || loading}
        styling={hasQuote && "primary"}
        loading={loading === "ASSIGN"}
        onClick={() => setConfirmation("ASSIGN")}
      >
        Assign Task
      </Button>
    );
  }

  if (isClient && stage === "Quote Requested") {
    actions.push(
      <Button
        key="quote"
        styling="primary"
        disabled={loading}
        loading={loading === "ASSIGN"}
        onClick={() => setConfirmation("ASSIGN")}
      >
        Assign Task
      </Button>
    );
  }

  if (isClient && stage === "Quote Provided") {
    actions.push(
      <Button
        key="quote"
        styling="primary"
        disabled={loading}
        onClick={() => setConfirmation("ASSIGN")}
        loading={loading === "ASSIGN"}
      >
        Assign Task
      </Button>
    );
  }

  if (!isClient && stage === "Assigned") {
    actions.push(
      <Button
        key="start"
        styling="primary"
        disabled={(!hasQuote || !hasDueDate) || loading}
        onClick={handleStartTask}
        loading={loading === "START_WORKING"}
      >
        Start Working
      </Button>
    );
  }

  if (!isClient && stage === "Working") {
    actions.push(
      <Button
        key="submit"
        styling="primary"
        disabled={loading}
        onClick={() => setConfirmation("SUBMIT")}
        loading={loading === "SUBMIT"}
      >
        Submit for approval
      </Button>
    );
  }

  if (isClient && stage === "Submitted") {
    actions.push(
      <Button
        key="approve"
        styling="primary"
        onClick={handleApproveTask}
        loading={loading == "APPROVE"}
      >
        Approve
      </Button>
    );
  }

  if (actions.length > 0) {
    return (
      <>
        {confirmation === "ASSIGN" && (
          <Confirmation>
            <ConfirmationContainer>
              <Padding bottom="s">
                <Text weight="semibold" colour="dark">
                  Assign Task
                </Text>
              </Padding>
              <Padding bottom="l">
                <Text size="s">
                  You will not be able to modify this task after it is assigned.
                  You can add additional tasks if more working needs to be done.
                </Text>
              </Padding>
              {!hasQuote && (
                <Padding bottom="l">
                  <Text size="s">
                    This task has no estimate. You may want to request a quote
                    first.
                  </Text>
                </Padding>
              )}
              <ButtonGroup fullWidth>
                <Button
                  loading={loading === "ASSIGN"}
                  onClick={handleAssign}
                  styling="primary"
                >
                  Assign
                </Button>
                <Button
                  disabled={loading === "ASSIGN"}
                  onClick={() => setConfirmation(null)}
                >
                  Cancel
                </Button>
              </ButtonGroup>
            </ConfirmationContainer>
          </Confirmation>
        )}

        {confirmation === "SUBMIT" && (
          <Confirmation>
            <ConfirmationContainer>
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
                  loading={loading === "SUBMIT"}
                  onClick={handleSubmitTask}
                  styling="primary"
                >
                  Submit
                </Button>
                <Button
                  disabled={loading === "SUBMIT"}
                  onClick={() => setConfirmation(null)}
                >
                  Cancel
                </Button>
              </ButtonGroup>
            </ConfirmationContainer>
          </Confirmation>
        )}
        <ButtonGroup fullWidth={isMobile}>{actions}</ButtonGroup>
      </>
    );
  }

  return null;
};

export default compose(
  graphql(REQUEST_QUOTE, { name: "requestQuote" }),
  graphql(ASSIGN_TASK, { name: "assignTask" }),
  graphql(START_TASK, { name: "startTask" }),
  graphql(SUBMIT_TASK, { name: "submitTask" }),
  graphql(APPROVE_TASK, { name: "approveTask" })
)(Component);
