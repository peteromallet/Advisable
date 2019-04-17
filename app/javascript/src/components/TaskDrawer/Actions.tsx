import * as React from "react";
import { compose, graphql } from "react-apollo";
import Text from "../Text";
import Button from "../Button";
import ButtonGroup from "../ButtonGroup";
import Padding from "../Spacing/Padding";
import VerticalLayout from "../VerticalLayout";
import START_TASK from "./startTask.graphql";
import ASSIGN_TASK from "./assignTask.graphql";
import SUBMIT_TASK from "./submitTask.graphql";
import REQUEST_QUOTE from "./requestQuote.graphql";
import { Confirmation, ConfirmationContainer } from "./styles";

const Component = ({
  task,
  isClient,
  startTask,
  submitTask,
  assignTask,
  requestQuote,
}) => {
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

  let actions = [];

  if (isClient && stage === "Not Assigned") {
    actions.push(
      <Button
        key="quote"
        styling="primary"
        disabled={loading}
        onClick={handleRequestQuote}
        loading={loading === "REQUEST_QUOTE"}
      >
        Request Quote
      </Button>
    );
    actions.push(
      <Button
        key="quote"
        disabled={loading}
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
        disabled={loading}
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
        onClick={handleSubmitTask}
        loading={loading === "SUBMIT"}
      >
        Submit for approval
      </Button>
    );
  }

  if (isClient && stage === "Pending Approval") {
    actions.push(
      <Button key="approve" styling="primary">
        Approve
      </Button>
    );
  }

  if (actions.length > 0) {
    return (
      <VerticalLayout.Footer style={{ background: "white" }}>
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
              {!task.estimate && (
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
        <Padding size="l">
          <ButtonGroup>{actions}</ButtonGroup>
        </Padding>
      </VerticalLayout.Footer>
    );
  }

  return null;
};

export default compose(
  graphql(REQUEST_QUOTE, { name: "requestQuote" }),
  graphql(ASSIGN_TASK, { name: "assignTask" }),
  graphql(START_TASK, { name: "startTask" }),
  graphql(SUBMIT_TASK, { name: "submitTask" })
)(Component);
