// TODO: Migrate existing uses of useBreakpoint to use the new breakpoints
// defined in the styled-system thme. Originally we used decending breakpoints,
// however, now we use the newer mobile first ascening breakpoints defined with
// em units.
const BREAKPOINTS = {
  s: "(max-width: 640px)",
  sUp: "(min-width: 40em)",
  m: "(max-width: 768px)",
  mUp: "(min-width: 52em)",
  l: "(max-width: 1024px)",
  lUp: "(min-width: 64em)",
  xl: "(max-width: 1280px)",
  xlUp: "(min-width: 80em)",
};

export default BREAKPOINTS;
