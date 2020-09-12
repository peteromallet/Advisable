// Renders the description of a task in its various stages.
import React from "react";
import { Info, AlertCircle } from "@styled-icons/feather";
import Notice from "../Notice";
import { Box, Text } from "@advisable/donut";
import { useTranslation } from "react-i18next";
import { StageDescription } from "./styles";

const FOR_CLIENT = {
  "Not Assigned": function NotAssignedDescription({ t, task }) {
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
  "Requested To Start": function RequestedToStartDescription({ t, task }) {
    return (
      <Box paddingBottom="m">
        <Notice icon={<Info />}>
          <Text size="xs" mb="xxs" weight="medium" color="neutral900">
            {t("tasks.stageDescriptions.client.requestedToStart.title", {
              task,
            })}
          </Text>
          <Text size="xs" color="neutral600" lineHeight="xs">
            {t("tasks.stageDescriptions.client.requestedToStart.description")}
          </Text>
        </Notice>
      </Box>
    );
  },
  "Quote Requested": function QuoteRequestedDescription({ t }) {
    return (
      <Box paddingBottom="m">
        <StageDescription>
          <Info />
          {t("tasks.stageDescriptions.client.quoteRequested")}
        </StageDescription>
      </Box>
    );
  },
  "Quote Provided": function QuoteProvidedDescription({ t, task }) {
    return (
      <Box paddingBottom="m">
        <StageDescription>
          <Info />
          {t("tasks.stageDescriptions.client.quoteProvided", { task })}
        </StageDescription>
      </Box>
    );
  },
  Assigned: function AssignedDescription({ t, task }) {
    return (
      <StageDescription>
        <Info />
        {t("tasks.stageDescriptions.client.assigned", { task })}
      </StageDescription>
    );
  },
  Working: function WorkingDescription({ t, task }) {
    return (
      <StageDescription>
        <Info />
        {t("tasks.stageDescriptions.client.working", { task })}
      </StageDescription>
    );
  },
  Submitted: function SubmittedDescription({ t, task }) {
    return (
      <Box paddingBottom="m">
        <StageDescription>
          <Info />
          {t("tasks.stageDescriptions.client.submitted", { task })}
        </StageDescription>
      </Box>
    );
  },
  Approved: function ApprovedDescription({ t, task }) {
    return (
      <StageDescription>
        <Info />
        {t("tasks.stageDescriptions.client.approved", { task })}
      </StageDescription>
    );
  },
};

const FOR_SPECIALIST = {
  "Quote Requested": function QuoteRequestedSpecialistDescription({ t }) {
    return (
      <StageDescription>
        <Info />
        {t("tasks.stageDescriptions.specialist.quoteRequested")}
      </StageDescription>
    );
  },
  "Requested To Start": function RequestedToStartSpecialistDescription({ t }) {
    return (
      <StageDescription>
        <Info />
        {t("tasks.stageDescriptions.specialist.requestedToStart")}
      </StageDescription>
    );
  },
  "Quote Provided": function QuoteProvidedSpecialistDescription({ t }) {
    return (
      <StageDescription>
        <Info />
        {t("tasks.stageDescriptions.specialist.quoteProvided")}
      </StageDescription>
    );
  },
  Assigned: function AssignedSpecialistDescription({ t, task }) {
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
  Working: function WorkingSpecialistDescription({ t, task }) {
    return (
      <Box paddingBottom="m">
        <StageDescription>
          <Info />
          {t("tasks.stageDescriptions.specialist.working", { task })}
        </StageDescription>
      </Box>
    );
  },
  Submitted: function SubmittedSpecialistDescription({ t, task }) {
    return (
      <StageDescription>
        <Info />
        {t("tasks.stageDescriptions.specialist.submitted", { task })}
      </StageDescription>
    );
  },
  Approved: function ApprovedSpecialistDescription({ t, task }) {
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
export default function TaskStageDescription({ isClient, task }) {
  const { t } = useTranslation();
  const prompts = isClient ? FOR_CLIENT : FOR_SPECIALIST;
  const Prompt = prompts[task.stage];

  if (!Prompt) {
    return null;
  }

  return <Prompt t={t} task={task} />;
}
