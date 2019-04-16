import React from "react";
import Icon from "../Icon";
import { useTranslation } from "react-i18next/hooks";
import { StageDescription } from "./styles";

// Renders the description of a task's stage. The descriptions themselves are
// stored inside the translation.json file.
export default ({ isClient, stage }) => {
  const [t, i18n] = useTranslation();
  const key = isClient
    ? `tasks.stageDescriptions.client.${stage}`
    : `tasks.stageDescriptions.specialist.${stage}`;
  const hasDescription = i18n.exists(key)
  
  if (!hasDescription) return null;

  return (
    <StageDescription>
      <Icon icon="info" width={20} />
      {t(key)}
    </StageDescription>
  );
};
