import find from "lodash/find";
import isObject from "lodash/isObject";

// Breakpoints
const breakpoints = ["40em", "52em", "64em", "80em"];
breakpoints.s = breakpoints[0];
breakpoints.m = breakpoints[1];
breakpoints.l = breakpoints[2];
breakpoints.xl = breakpoints[3];

// Spacing
const space = [0, 4, 8, 16, 20, 32, 40, 60, 80, 100];
space.xxs = space[1];
space.xs = space[2];
space.s = space[3];
space.m = space[4];
space.l = space[5];
space.xl = space[6];
space.xxl = space[7];

// Font sizes
const fontSizes = {
  xxs: 12,
  xs: 14,
  s: 15,
  m: 16,
  l: 18,
  xl: 20,
  xxl: 24,
  xxxl: 28,
  xxxxl: 32,
};

// Font weights
const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

// Line heights
const lineHeights = {
  xxs: "14px",
  xs: "16px",
  s: "19px",
  m: "22px",
  l: "24px",
  xl: "26px",
  xxl: "28px",
  xxxl: "32px",
  xxxxl: "36px",
};

export default {
  background: "default",
  responsiveProp: prop => {
    if (!isObject(prop)) return prop;
    let propForBreakpoint = find(prop, (_, breakpoint) => {
      return breakpoints[breakpoint];
    });
    return propForBreakpoint || prop.default || prop.all;
  },
  colors: {
    white: [
      "rgba(255, 255, 255, 0.1)",
      "rgba(255, 255, 255, 0.2)",
      "rgba(255, 255, 255, 0.3)",
      "rgba(255, 255, 255, 0.4)",
      "rgba(255, 255, 255, 0.5)",
      "rgba(255, 255, 255, 0.6)",
      "rgba(255, 255, 255, 0.7)",
      "rgba(255, 255, 255, 0.8)",
      "rgba(255, 255, 255, 0.9)",
      "rgba(255, 255, 255, 1)",
    ],
    neutral: [
      "#F4F6FD",
      "#DBDEE8",
      "#BBBEC9",
      "#999CA9",
      "#717484",
      "#4A4C5E",
      "#24283A",
      "#101425",
      "#03071A",
    ],
    blue: [
      "#E0E7FF",
      "#CAD6FF",
      "#A3B7FF",
      "#6B8CFF",
      "#2555FF",
      "#1944DC",
      "#1232A6",
      "#0A2172",
      "#051448",
    ],
    red: [
      "#FFECEE",
      "#FFD6DB",
      "#FFB0BA",
      "#FF7787",
      "#FF3F56",
      "#D7283D",
      "#AC1B2C",
      "#7D0D1A",
      "#4B030C",
    ],
  },
  space,
  fontSizes,
  fontWeights,
  lineHeights,
  breakpoints,
};
