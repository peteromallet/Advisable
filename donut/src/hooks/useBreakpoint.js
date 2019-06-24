// A hook to query the current state of a breakpoint. accepted breakpoints are:
// s, m or l. See components/Provider/index.js for more information
import { useContext } from "react";
import context from "../components/Provider/context";

const useBreakpoint = name => {
  const appContext = useContext(context);
  return appContext.breakpoints[name];
};

export default useBreakpoint;
