import * as React from "react";
import { useMutation } from "@apollo/react-hooks";
import Button from "../Button";
import { Button as DonutButton } from "@advisable/donut";
import Padding from "../Spacing/Padding";
import { Text } from "@advisable/donut";
import ButtonGroup from "../ButtonGroup";
import Notice from "../Notice";
import START_TASK from "./startTask.graphql";
import REQUEST_QUOTE from "./requestQuote.graphql";
import REQUEST_TO_START from "./requestToStart";
import { useMobile } from "../Breakpoint";

export default function TaskDrawerActions({ task, isClient, setPrompt }) {
  const isMobile = useMobile();
  const [requestQuote] = useMutation(REQUEST_QUOTE);
  const [startTask] = useMutation(START_TASK);
  const [requestToStart] = useMutation(REQUEST_TO_START);

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

  const handleRequestToStart = async () => {
    setLoading("REQUEST_TO_START");
    await requestToStart({
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
  const isFixed = task.application.projectType === "Fixed";
  const applicationFlexible = task.application.projectType === "Flexible";
  const applicationIsWorking = task.application.status === "Working";

  let notice;

  if (
    !isClient &&
    applicationFlexible &&
    applicationIsWorking &&
    stage === "Not Assigned"
  ) {
    actions.push(
      <Button
        key="submit"
        styling="primary"
        disabled={loading || !hasName}
        aria-label="Mark as complete"
        onClick={() => setPrompt("SUBMIT_PROMPT")}
        loading={loading === "SUBMIT" ? true : undefined}
      >
        Mark as complete
      </Button>,
    );
  }

  // If the client s viewing and the task stage is Requested To Start then show
  // an action to assign the task.
  if (isClient && stage === "Requested To Start") {
    actions.push(
      <Button
        key="assign"
        styling={"primary"}
        loading={loading === "ASSIGN" ? true : undefined}
        onClick={() => setPrompt("ASSIGN_PROMPT")}
      >
        Assign Task
      </Button>,
    );

    if (!hasQuote) {
      actions.push(
        <Button
          key="quote"
          disabled={!hasNameAndDescription || loading}
          onClick={handleRequestQuote}
          loading={loading === "REQUEST_QUOTE" ? true : undefined}
        >
          Request Quote
        </Button>,
      );
    }
  }

  // when the specialist is viewing and the project is a Fixed project and the
  // task stage is Not Assigned then allow them to request to start.
  if (
    !isClient &&
    isFixed &&
    applicationIsWorking &&
    stage === "Not Assigned"
  ) {
    actions.push(
      <DonutButton
        size="s"
        intent="success"
        appearance="primary"
        key="requestToStart"
        onClick={handleRequestToStart}
        disabled={!hasNameAndDescription || loading}
        loading={loading === "REQUEST_TO_START" ? true : undefined}
      >
        Request to Start Working
      </DonutButton>,
    );

    if (!hasName || !hasDescription) {
      notice = (
        <Padding bottom="m">
          <Notice icon="info">
            <Text size="xs" mb="xxs" weight="medium" color="neutral.9">
              Not Assigned
            </Text>
            <Text size="xs" color="neutral.6" lineHeight="xs">
              You must provide a name or description for this task before you
              can request to start working on it.
            </Text>
          </Notice>
        </Padding>
      );
    }
  }

  if (isClient && stage === "Not Assigned") {
    if (!hasQuote) {
      actions.push(
        <Button
          key="quote"
          styling="primary"
          disabled={!hasNameAndDescription || loading}
          onClick={handleRequestQuote}
          loading={loading === "REQUEST_QUOTE" ? true : undefined}
        >
          Request Quote
        </Button>,
      );
    }

    actions.push(
      <Button
        key="assign"
        disabled={!hasNameAndDescription || loading}
        styling={hasQuote && "primary"}
        loading={loading === "ASSIGN" ? true : undefined}
        onClick={() => setPrompt("ASSIGN_PROMPT")}
      >
        Assign Task
      </Button>,
    );
  }

  if (isClient && stage === "Quote Requested") {
    actions.push(
      <Button
        key="quote"
        styling="primary"
        disabled={loading}
        loading={loading === "ASSIGN" ? true : undefined}
        onClick={() => setPrompt("ASSIGN_PROMPT")}
      >
        Assign Task
      </Button>,
    );
  }

  if (isClient && stage === "Quote Provided") {
    actions.push(
      <Button
        key="quote"
        styling="primary"
        disabled={loading}
        onClick={() => setPrompt("ASSIGN_PROMPT")}
        loading={loading === "ASSIGN" ? true : undefined}
      >
        Assign Task
      </Button>,
    );
  }

  if (!isClient && stage === "Assigned") {
    actions.push(
      <Button
        key="start"
        styling="primary"
        disabled={!hasQuote || !hasDueDate || loading}
        onClick={handleStartTask}
        loading={loading === "START_WORKING" ? true : undefined}
      >
        Start Working
      </Button>,
    );
  }

  if (!isClient && stage === "Working") {
    actions.push(
      <Button
        key="submit"
        styling="primary"
        disabled={loading}
        aria-label="Mark as complete"
        onClick={() => setPrompt("SUBMIT_PROMPT")}
        loading={loading === "SUBMIT" ? true : undefined}
      >
        Mark as complete
      </Button>,
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
      </Button>,
    );
  }

  if (actions.length > 0) {
    return (
      <>
        {notice}
        <ButtonGroup fullWidth={isMobile}>{actions}</ButtonGroup>
      </>
    );
  }

  return null;
}
