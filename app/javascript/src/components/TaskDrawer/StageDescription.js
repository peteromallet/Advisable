// Renders the description of a task in its various stages.
import React from "react";
import Icon from "../Icon";
import Padding from "../Spacing/Padding";
import { useTranslation } from "react-i18next/hooks";
import { StageDescription } from "./styles";

const FOR_CLIENT = {
  "Not Assigned": ({ t, task }) => {
    if (task.name && task.description) return null;

    return (
      <Padding bottom="m">
        <StageDescription>
          <Icon icon="alert-circle" width={20} />
          {t("tasks.stageDescriptions.client.nameAndDescriptionRequired")}
        </StageDescription>
      </Padding>
    );
  },
  "Quote Requested": ({ t }) => {
    return (
      <Padding bottom="m">
        <StageDescription>
          <Icon icon="info" width={20} />
          {t("tasks.stageDescriptions.client.quoteRequested")}
        </StageDescription>
      </Padding>
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
  },
};

const FOR_SPECIALIST = {
  "Quote Requested": ({ t }) => {
    return (
      <StageDescription>
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
      <Padding bottom="m">
        <StageDescription>
          <Icon icon="info" width={20} />
          {t("tasks.stageDescriptions.specialist.assigned", { task })}
        </StageDescription>
      </Padding>
    );
  },
  Working: ({ t, task }) => {
    return (
      <Padding bottom="m">
        <StageDescription>
          <Icon icon="info" width={20} />
          {t("tasks.stageDescriptions.specialist.working", { task })}
        </StageDescription>
      </Padding>
    );
  },
  Submitted: ({ t, task }) => {
    return (
      <StageDescription>
        <Icon icon="info" width={20} />
        {t("tasks.stageDescriptions.specialist.submitted", { task })}
      </StageDescription>
    );
  },
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
