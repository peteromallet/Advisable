import { useTranslation } from "react-i18next";
import VideoModal from "../VideoModal";
import useTutorial from "../../hooks/useTutorial";

const FixedProjectTutorial = ({ modal, isClient }) => {
  const { t } = useTranslation();
  const tutorial = useTutorial("fixedProjects");

  let summary = isClient ? "clientSummary" : "freelancerSummary";
  let videoId = "bWeHGq9Asl0";
  if (isClient) {
    videoId = "eU17UD8hKrg";
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
      heading={t(`tutorials.fixedProjects.heading`)}
      summary={t(`tutorials.fixedProjects.${summary}`)}
    />
  );
};

export default FixedProjectTutorial;
