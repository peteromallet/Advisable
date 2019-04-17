// Renders the description of a task in its various stages.
import React from "react";
import Icon from "../Icon";
import { useTranslation } from "react-i18next/hooks";
import { ArrowPrompt, StageDescription } from "./styles";

const FOR_CLIENT = {
  "Quote Requested": ({ t }) => {
    return (
      <StageDescription>
        <Icon icon="info" width={20} />
        {t("tasks.stageDescriptions.client.quoteRequested")}
      </StageDescription>
    );
  },
  "Quote Provided": ({ t, task }) => {
    return (
      <StageDescription>
        <Icon icon="info" width={20} />
        {t("tasks.stageDescriptions.client.quoteProvided", { task })}
      </StageDescription>
    );
  },
  Assigned: ({ t, task }) => {
    return (
      <StageDescription>
        <Icon icon="info" width={20} />
        {t("tasks.stageDescriptions.client.assigned", { task })}
      </StageDescription>
    );
  },
  Working: ({ t, task }) => {
    return (
      <StageDescription>
        <Icon icon="info" width={20} />
        {t("tasks.stageDescriptions.client.working", { task })}
      </StageDescription>
    );
  },
  Submitted: ({ t, task }) => {
    return (
      <StageDescription>
        <Icon icon="info" width={20} />
        {t("tasks.stageDescriptions.client.submitted", { task })}
      </StageDescription>
    );
  }
};

const FOR_SPECIALIST = {
  "Quote Requested": ({ t }) => {
    return (
      <StageDescription>
        <ArrowPrompt>
          <Icon icon="arrow-up" strokeWidth={2} />
        </ArrowPrompt>
        <Icon icon="info" width={20} />
        {t("tasks.stageDescriptions.specialist.quoteRequested")}
      </StageDescription>
    );
  },
  "Quote Provided": ({ t }) => {
    return (
      <StageDescription>
        <Icon icon="info" width={20} />
        {t("tasks.stageDescriptions.specialist.quoteProvided")}
      </StageDescription>
    );
  },
  Assigned: ({ t, task }) => {
    return (
      <StageDescription>
        <Icon icon="info" width={20} />
        {t("tasks.stageDescriptions.specialist.assigned", { task })}
      </StageDescription>
    );
  },
  Working: ({ t, task }) => {
    return (
      <StageDescription>
        <Icon icon="info" width={20} />
        {t("tasks.stageDescriptions.specialist.working", { task })}
      </StageDescription>
    );
  },
  Submitted: ({ t, task }) => {
    return (
      <StageDescription>
        <Icon icon="info" width={20} />
        {t("tasks.stageDescriptions.specialist.submitted", { task })}
      </StageDescription>
    );
  }
};

// Renders the description of a task's stage. The descriptions themselves are
// stored inside the translation.json file.
export default ({ isClient, task }) => {
  const [t] = useTranslation();
  const prompts = isClient ? FOR_CLIENT : FOR_SPECIALIST;
  const Prompt = prompts[task.stage];

  if (!Prompt) {
    return null;
  }

  return <Prompt t={t} task={task} />;
};
