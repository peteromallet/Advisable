import * as React from "react";
import { motion } from "framer-motion";
import { Info, ArrowLeft } from "@styled-icons/feather";
import { useMutation } from "@apollo/react-hooks";
import { Box, Button, Text } from "@advisable/donut";
import ButtonGroup from "../ButtonGroup";
import Notice from "../Notice";
import START_TASK from "./startTask.graphql";
import REQUEST_QUOTE from "./requestQuote.graphql";
import REQUEST_TO_START from "./requestToStart";
import useViewer from "../../hooks/useViewer";
import { useMobile } from "../Breakpoint";

function AssignButton({ projectType, ...props }) {
  const viewer = useViewer();
  const showArrow =
    projectType === "Fixed" &&
    viewer.completedTutorials.indexOf("fixedProjects") === -1;

  return (
    <Box position="relative">
      {showArrow && (
        <Box
          right="-32px"
          color="blue500"
          as={motion.div}
          position="absolute"
          top="calc(50% - 13px)"
          animate={{ x: [0, 10, 0] }}
          transition={{ loop: Infinity }}
        >
          <ArrowLeft size={24} strokeWidth={2} />
        </Box>
      )}
      <Button {...props} />
    </Box>
  );
}

export default function TaskDrawerActions({
  task,
  isClient,
  setPrompt,
  projectType,
}) {
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
      <AssignButton
        projectType={projectType}
        key="assign"
        loading={loading === "ASSIGN" ? true : undefined}
        onClick={() => setPrompt("ASSIGN_PROMPT")}
      >
        Assign Task
      </AssignButton>,
    );

    if (!hasQuote) {
      actions.push(
        <Button
          key="quote"
          variant="dark"
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
      <Button
        size="s"
        key="requestToStart"
        onClick={handleRequestToStart}
        disabled={!hasNameAndDescription || loading}
        loading={loading === "REQUEST_TO_START" ? true : undefined}
      >
        Request to Start Working
      </Button>,
    );

    if (!hasName || !hasDescription) {
      notice = (
        <Box paddingBottom="m">
          <Notice icon={<Info />}>
            <Text size="xs" mb="xxs" weight="medium" color="neutral.9">
              Not Assigned
            </Text>
            <Text size="xs" color="neutral.6" lineHeight="xs">
              You must provide a name or description for this task before you
              can request to start working on it.
            </Text>
          </Notice>
        </Box>
      );
    }
  }

  if (isClient && stage === "Not Assigned") {
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

    actions.push(
      <AssignButton
        projectType={projectType}
        key="assign"
        disabled={!hasNameAndDescription || loading}
        variant={hasQuote ? "primary" : "subtle"}
        loading={loading === "ASSIGN" ? true : undefined}
        onClick={() => setPrompt("ASSIGN_PROMPT")}
      >
        Assign Task
      </AssignButton>,
    );
  }

  if (isClient && stage === "Quote Requested") {
    actions.push(
      <AssignButton
        projectType={projectType}
        key="quote"
        disabled={loading}
        loading={loading === "ASSIGN" ? true : undefined}
        onClick={() => setPrompt("ASSIGN_PROMPT")}
      >
        Assign Task
      </AssignButton>,
    );
  }

  if (isClient && stage === "Quote Provided") {
    actions.push(
      <AssignButton
        projectType={projectType}
        key="quote"
        disabled={loading}
        onClick={() => setPrompt("ASSIGN_PROMPT")}
        loading={loading === "ASSIGN" ? true : undefined}
      >
        Assign Task
      </AssignButton>,
    );
  }

  if (!isClient && stage === "Assigned") {
    actions.push(
      <Button
        key="start"
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
      <Button key="approve" onClick={() => setPrompt("APPROVE_PROMPT")}>
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
