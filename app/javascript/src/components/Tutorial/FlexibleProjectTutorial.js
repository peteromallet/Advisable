import React from "react";
import { useTranslation } from "react-i18next";
import VideoModal from "../VideoModal";

const FlexibleProjectTutorial = ({ tutorial, isClient = false }) => {
  const { t } = useTranslation();

  let summary = isClient ? "clientSummary" : "freelancerSummary";
  let url = "https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0";

  return (
    <VideoModal
      url={url}
      isOpen={tutorial.isActive}
      onDismiss={tutorial.complete}
      heading={t(`tutorials.${tutorial.name}.heading`)}
      summary={t(`tutorials.${tutorial.name}.${summary}`)}
    />
  );
};

export default FlexibleProjectTutorial;
