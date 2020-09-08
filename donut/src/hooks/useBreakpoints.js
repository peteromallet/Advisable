import breakpointConfig from "../breakpoints";
import useMediaQuery from "./useMediaQuery";

export default function useBreakpoints() {
  const s = useMediaQuery(breakpointConfig.s);
  const sUp = useMediaQuery(breakpointConfig.sUp);
  const m = useMediaQuery(breakpointConfig.m);
  const mUp = useMediaQuery(breakpointConfig.mUp);
  const l = useMediaQuery(breakpointConfig.l);
  const lUp = useMediaQuery(breakpointConfig.lUp);
  const xl = useMediaQuery(breakpointConfig.xl);
  const xlUp = useMediaQuery(breakpointConfig.xlUp);

  // Iterate through the breakpoints and build up an object determining which
  // breakpoints are active. This object will have a key of the breakpoint name
  // and a boolean value to indicate wether the breakpoint is active or not.
  // e.g { s: false, m: true, l: true }
  const breakpoints = { s, sUp, m, mUp, l, lUp, xl, xlUp };

  return breakpoints;
}
