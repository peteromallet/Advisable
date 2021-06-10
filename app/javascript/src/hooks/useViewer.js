import { useContext } from "react";
import context from "../applicationContext";

const useViewer = () => {
  const app = useContext(context);
  if (app.viewer) {
    const isClient = app?.viewer?.__typename === "User";
    const isSpecialist = app?.viewer?.__typename === "Specialist";
    const applicationStage = app?.viewer?.applicationStage;

    let isAccepted = false;
    if (isClient && applicationStage === "Application Accepted") {
      isAccepted = true;
    }

    if (isSpecialist && applicationStage === "Accepted") {
      isAccepted = true;
    }

    return {
      ...app.viewer,
      isClient,
      isSpecialist,
      isAccepted,
    };
  }

  return null;
};

export default useViewer;
