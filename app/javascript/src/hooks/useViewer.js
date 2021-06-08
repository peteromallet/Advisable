import { useContext } from "react";
import context from "../applicationContext";

const useViewer = () => {
  const app = useContext(context);
  if (app.viewer) {
    return {
      ...app.viewer,
      isClient: app?.viewer?.__typename === "User",
      isSpecialist: app?.viewer?.__typename === "Specialist",
      isAccepted: app?.viewer?.applicationStage === "Accepted",
    };
  }

  return null;
};

export default useViewer;
