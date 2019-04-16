import * as React from "react";
import { compose, graphql } from "react-apollo";
import Button from "../Button";
import ButtonGroup from "../ButtonGroup";
import Padding from "../Spacing/Padding";
import VerticalLayout from "../VerticalLayout";
import REQUEST_QUOTE from "./requestQuote.graphql";
import ASSIGN_TASK from "./assignTask.graphql";
import {
  TaskDrawer,
  TaskDetails,
  Confirmation,
  ConfirmationContainer,
} from "./styles";

const Component = ({ task, isClient, requestQuote, assignTask }) => {
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

  const submitAssignTask = async () => {
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

  const handleAssign = () => {
    if (!task.estimate) {
      setConfirmation("ASSIGN");
    } else {
      submitAssignTask();
    }
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
        onClick={handleAssign}
        loading={loading === "ASSIGN"}
      >
        Assign
      </Button>
    );
  }

  if (isClient && stage === "Quote Requested") {
    actions.push(
      <Button
        key="quote"
        styling="primary"
        disabled={loading}
        onClick={handleAssign}
        loading={loading === "ASSIGN"}
      >
        Assign Task
      </Button>
    );
  }

  if (isClient && stage === "Quote Provided") {
    actions.push(
      <Button key="assign" styling="primary">
        Assign Task
      </Button>
    );
  }

  if (!isClient && stage === "Assigned") {
    actions.push(
      <Button key="start" styling="primary">
        Start Working
      </Button>
    );
  }

  if (!isClient && stage === "In Progress") {
    actions.push(
      <Button key="submit" styling="primary">
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
              <p>
                Are you sure you want to assign this task without an estimate?
              </p>
              <ButtonGroup fullWidth>
                <Button
                  loading={loading === "ASSIGN"}
                  onClick={submitAssignTask}
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
  graphql(ASSIGN_TASK, { name: "assignTask" })
)(Component);
