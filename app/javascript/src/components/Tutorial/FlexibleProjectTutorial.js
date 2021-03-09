import React from "react";
import { useTranslation } from "react-i18next";
import VideoModal from "../VideoModal";
import useTutorial from "../../hooks/useTutorial";

const FlexibleProjectTutorial = ({ modal, isClient = false }) => {
  const { t } = useTranslation();
  const tutorial = useTutorial("flexible_projects");

  let summary = isClient ? "clientSummary" : "freelancerSummary";
  // default to the freelancer video
  let videoId = "qDodYvL4H8g";
  if (isClient) {
    videoId = "0XanXMDAqdI";
  }

  let url = `https://www.youtube.com/embed/${videoId}`;

  const handleDismiss = () => {
    tutorial.complete();
    modal.hide();
  };

  return (
    <VideoModal
      url={url}
      onDismiss={handleDismiss}
      heading={t(`tutorials.flexible_projects.heading`)}
      summary={t(`tutorials.flexible_projects.${summary}`)}
    />
  );
};

export default FlexibleProjectTutorial;
