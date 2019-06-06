import { useContext } from "react";
import context from "../components/Provider/context";

const useBreakpoint = name => {
  const appContext = useContext(context);
  return appContext.breakpoints[name];
};

export default useBreakpoint;
