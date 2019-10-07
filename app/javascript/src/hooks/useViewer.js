import { useContext } from "react";
import { get } from "lodash";
import context from "../applicationContext";

const useViewer = () => {
  const app = useContext(context);
  if (app.viewer) {
    return {
      ...app.viewer,
      isClient: get(app, "viewer.__typename") === "User",
      isSpecialist: get(app, "viewer.__typename") === "Specialist",
    };
  }

  return null;
};

export default useViewer;
