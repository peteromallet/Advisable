import { useContext } from "react";
import context from "../applicationContext";

const useViewer = () => {
  const app = useContext(context);
  return {
    ...app.viewer,
    isClient: app.viewer.__typename === "User",
    isSpecialist: app.viewer.__typename === "Specialist",
  };
};

export default useViewer;
