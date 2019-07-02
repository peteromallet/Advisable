import React from "react";
import { useTranslation } from "react-i18next";
import VideoModal from "../VideoModal";

const FlexibleProjectTutorial = ({ tutorial, isClient = false }) => {
  const { t } = useTranslation();

  let summary = isClient ? "clientSummary" : "freelancerSummary";
  // default to the freelancer video
  let videoId = "qDodYvL4H8g";
  if (isClient) {
    videoId = "0XanXMDAqdI";
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

export default FlexibleProjectTutorial;
