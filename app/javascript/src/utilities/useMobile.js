import useMediaQuery from "./useMediaQuery";

export const mobileBreakpoint = "@media (max-width: 600px)";

export default () => {
  return useMediaQuery("(max-width: 600px)");
};
