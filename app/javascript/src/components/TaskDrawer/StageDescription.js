// Renders the description of a task in its various stages.
import React from "react";
import { Info, AlertCircle } from "@styled-icons/feather";
import Notice from "../Notice";
import { Box, Text } from "@advisable/donut";
import { useTranslation } from "react-i18next";
import { StageDescription } from "./styles";

const FOR_CLIENT = {
  "Not Assigned": ({ t, task }) => {
    if (task.name && task.description) return null;

    return (
      <Box paddingBottom="m">
        <StageDescription>
          <AlertCircle />
          {t("tasks.stageDescriptions.client.nameAndDescriptionRequired")}
        </StageDescription>
      </Box>
    );
  },
  "Requested To Start": ({ t, task }) => (
    <Box paddingBottom="m">
      <Notice icon={<Info />}>
        <Text size="xs" mb="xxs" weight="medium" color="neutral.9">
          {t("tasks.stageDescriptions.client.requestedToStart.title", { task })}
        </Text>
        <Text size="xs" color="neutral.6" lineHeight="xs">
          {t("tasks.stageDescriptions.client.requestedToStart.description")}
        </Text>
      </Notice>
    </Box>
  ),
  "Quote Requested": ({ t }) => {
    return (
      <Box paddingBottom="m">
        <StageDescription>
          <Info />
          {t("tasks.stageDescriptions.client.quoteRequested")}
        </StageDescription>
      </Box>
    );
  },
  "Quote Provided": ({ t, task }) => {
    return (
      <Box paddingBottom="m">
        <StageDescription>
          <Info />
          {t("tasks.stageDescriptions.client.quoteProvided", { task })}
        </StageDescription>
      </Box>
    );
  },
  Assigned: ({ t, task }) => {
    return (
      <StageDescription>
        <Info />
        {t("tasks.stageDescriptions.client.assigned", { task })}
      </StageDescription>
    );
  },
  Working: ({ t, task }) => {
    return (
      <StageDescription>
        <Info />
        {t("tasks.stageDescriptions.client.working", { task })}
      </StageDescription>
    );
  },
  Submitted: ({ t, task }) => {
    return (
      <Box paddingBottom="m">
        <StageDescription>
          <Info />
          {t("tasks.stageDescriptions.client.submitted", { task })}
        </StageDescription>
      </Box>
    );
  },
  Approved: ({ t, task }) => {
    return (
      <StageDescription>
        <Info />
        {t("tasks.stageDescriptions.client.approved", { task })}
      </StageDescription>
    );
  },
};

const FOR_SPECIALIST = {
  "Quote Requested": ({ t }) => {
    return (
      <StageDescription>
        <Info />
        {t("tasks.stageDescriptions.specialist.quoteRequested")}
      </StageDescription>
    );
  },
  "Requested To Start": ({ t }) => {
    return (
      <StageDescription>
        <Info />
        {t("tasks.stageDescriptions.specialist.requestedToStart")}
      </StageDescription>
    );
  },
  "Quote Provided": ({ t }) => {
    return (
      <StageDescription>
        <Info />
        {t("tasks.stageDescriptions.specialist.quoteProvided")}
      </StageDescription>
    );
  },
  Assigned: ({ t, task }) => {
    let key = "assigned";

    if (!task.estimate) {
      key = "estimateRequiredToStart";
    }

    if (!task.dueDate) {
      key = "dueDateRequiredToStart";
    }

    return (
      <Box paddingBottom="m">
        <StageDescription>
          <Info />
          {t(`tasks.stageDescriptions.specialist.${key}`, { task })}
        </StageDescription>
      </Box>
    );
  },
  Working: ({ t, task }) => {
    return (
      <Box paddingBottom="m">
        <StageDescription>
          <Info />
          {t("tasks.stageDescriptions.specialist.working", { task })}
        </StageDescription>
      </Box>
    );
  },
  Submitted: ({ t, task }) => {
    return (
      <StageDescription>
        <Info />
        {t("tasks.stageDescriptions.specialist.submitted", { task })}
      </StageDescription>
    );
  },
  Approved: ({ t, task }) => {
    return (
      <StageDescription>
        <Info />
        {t("tasks.stageDescriptions.client.approved", { task })}
      </StageDescription>
    );
  },
};

// Renders the description of a task's stage. The descriptions themselves are
// stored inside the translation.json file.
export default ({ isClient, task }) => {
  const { t } = useTranslation();
  const prompts = isClient ? FOR_CLIENT : FOR_SPECIALIST;
  const Prompt = prompts[task.stage];

  if (!Prompt) {
    return null;
  }

  return <Prompt t={t} task={task} />;
};
