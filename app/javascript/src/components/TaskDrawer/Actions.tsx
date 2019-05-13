import * as React from "react";
import { compose, graphql } from "react-apollo";
import Button from "../Button";
import ButtonGroup from "../ButtonGroup";
import START_TASK from "./startTask.graphql";
import REQUEST_QUOTE from "./requestQuote.graphql";
import { useMobile } from "../../components/Breakpoint";

const Component = ({ task, isClient, startTask, requestQuote, setPrompt }) => {
  const isMobile = useMobile();
  const [loading, setLoading] = React.useState(null);
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

  let actions = [];
  const hasQuote = Boolean(task.estimate);
  const hasDueDate = Boolean(task.dueDate);
  const hasName = Boolean(task.name);
  const hasDescription = Boolean(task.description);
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
        onClick={() => setPrompt("ASSIGN_PROMPT")}
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
        onClick={() => setPrompt("ASSIGN_PROMPT")}
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
        onClick={() => setPrompt("ASSIGN_PROMPT")}
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
        disabled={!hasQuote || !hasDueDate || loading}
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
        onClick={() => setPrompt("SUBMIT_PROMPT")}
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
        onClick={() => setPrompt("APPROVE_PROMPT")}
      >
        Approve
      </Button>
    );
  }

  if (actions.length > 0) {
    return <ButtonGroup fullWidth={isMobile}>{actions}</ButtonGroup>;
  }

  return null;
};

export default compose(
  graphql(REQUEST_QUOTE, { name: "requestQuote" }),
  graphql(START_TASK, { name: "startTask" })
)(Component);
