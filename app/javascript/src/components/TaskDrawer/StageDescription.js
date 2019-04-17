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
    )
  },
};

// Renders the description of a task's stage. The descriptions themselves are
// stored inside the translation.json file.
export default ({ isClient, stage }) => {
  const [t] = useTranslation();
  const prompts = isClient ? FOR_CLIENT : FOR_SPECIALIST;
  const Prompt = prompts[stage];

  if (!Prompt) {
    return null;
  }

  return <Prompt t={t} />;
};
