import { useContext } from "react";
import context from "../applicationContext";

const useTalkSession = () => {
  const appContext = useContext(context);
  return appContext.talkSession;
};

export default useTalkSession;
