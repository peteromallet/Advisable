import { useContext } from "react";
import context from "../applicationContext";

const useViewer = () => {
  const app = useContext(context);
  return app.viewer;
};

export default useViewer;
