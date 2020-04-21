import * as React from "react";
import { useMutation } from "@apollo/react-hooks";
import { RoundedButton } from "@advisable/donut";
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
      <RoundedButton
        key="submit"
        disabled={loading || !hasName}
        aria-label="Mark as complete"
        onClick={() => setPrompt("SUBMIT_PROMPT")}
        loading={loading === "SUBMIT" ? true : undefined}
      >
        Mark as complete
      </RoundedButton>,
    );
  }

  // If the client s viewing and the task stage is Requested To Start then show
  // an action to assign the task.
  if (isClient && stage === "Requested To Start") {
    actions.push(
      <RoundedButton
        key="assign"
        loading={loading === "ASSIGN" ? true : undefined}
        onClick={() => setPrompt("ASSIGN_PROMPT")}
      >
        Assign Task
      </RoundedButton>,
    );

    if (!hasQuote) {
      actions.push(
        <RoundedButton
          key="quote"
          variant="dark"
          disabled={!hasNameAndDescription || loading}
          onClick={handleRequestQuote}
          loading={loading === "REQUEST_QUOTE" ? true : undefined}
        >
          Request Quote
        </RoundedButton>,
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
      <RoundedButton
        size="s"
        key="requestToStart"
        onClick={handleRequestToStart}
        disabled={!hasNameAndDescription || loading}
        loading={loading === "REQUEST_TO_START" ? true : undefined}
      >
        Request to Start Working
      </RoundedButton>,
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
        <RoundedButton
          key="quote"
          disabled={!hasNameAndDescription || loading}
          onClick={handleRequestQuote}
          loading={loading === "REQUEST_QUOTE" ? true : undefined}
        >
          Request Quote
        </RoundedButton>,
      );
    }

    actions.push(
      <RoundedButton
        key="assign"
        disabled={!hasNameAndDescription || loading}
        styling={hasQuote ? "primary" : "dark"}
        loading={loading === "ASSIGN" ? true : undefined}
        onClick={() => setPrompt("ASSIGN_PROMPT")}
      >
        Assign Task
      </RoundedButton>,
    );
  }

  if (isClient && stage === "Quote Requested") {
    actions.push(
      <RoundedButton
        key="quote"
        disabled={loading}
        loading={loading === "ASSIGN" ? true : undefined}
        onClick={() => setPrompt("ASSIGN_PROMPT")}
      >
        Assign Task
      </RoundedButton>,
    );
  }

  if (isClient && stage === "Quote Provided") {
    actions.push(
      <RoundedButton
        key="quote"
        disabled={loading}
        onClick={() => setPrompt("ASSIGN_PROMPT")}
        loading={loading === "ASSIGN" ? true : undefined}
      >
        Assign Task
      </RoundedButton>,
    );
  }

  if (!isClient && stage === "Assigned") {
    actions.push(
      <RoundedButton
        key="start"
        disabled={!hasQuote || !hasDueDate || loading}
        onClick={handleStartTask}
        loading={loading === "START_WORKING" ? true : undefined}
      >
        Start Working
      </RoundedButton>,
    );
  }

  if (!isClient && stage === "Working") {
    actions.push(
      <RoundedButton
        key="submit"
        disabled={loading}
        aria-label="Mark as complete"
        onClick={() => setPrompt("SUBMIT_PROMPT")}
        loading={loading === "SUBMIT" ? true : undefined}
      >
        Mark as complete
      </RoundedButton>,
    );
  }

  if (isClient && stage === "Submitted") {
    actions.push(
      <RoundedButton key="approve" onClick={() => setPrompt("APPROVE_PROMPT")}>
        Approve
      </RoundedButton>,
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
