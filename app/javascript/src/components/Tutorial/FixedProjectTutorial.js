import React from "react";
import { useTranslation } from "react-i18next";
import VideoModal from "../VideoModal";

const FixedProjectTutorial = ({ tutorial, isClient }) => {
  const { t } = useTranslation();

  let summary = isClient ? "clientSummary" : "freelancerSummary";
  let videoId = "bWeHGq9Asl0";
  if (isClient) {
    videoId = "eU17UD8hKrg";
  }
  let url = `https://www.youtube.com/embed/${videoId}`;

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

export default FixedProjectTutorial;
