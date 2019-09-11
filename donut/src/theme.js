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
  xxxl: 32,
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
  xs: "17px",
  s: "19px",
  m: "22px",
  l: "24px",
  xl: "26px",
  xxl: "28px",
  xxxl: "34px",
  xxxxl: "36px",
};

const boxShadow = {
  s: "0 1px 2px red",
  m: "0 5px 10px red",
};

const colors = {
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
    "#F8F9FF",
    "#E9EAEF",
    "#C1C2C8",
    "#A6A7AC",
    "#8B8C90",
    "#6F7074",
    "#545559",
    "#38393D",
    "#1D1E21",
  ],
  blue: [
    "#E6F8FF",
    "#B6E1FF",
    "#85BFFF",
    "#5590FF",
    "#2555FF",
    "#0425E8",
    "#0712AE",
    "#080776",
    "#0A0540",
  ],
  green: [
    "#EAFAFB",
    "#B0E8DE",
    "#75D7C2",
    "#3BC5A5",
    "#00B388",
    "#019678",
    "#027967",
    "#025C52",
    "#02403C",
  ],
  yellow: [
    "#FFF5ED",
    "#FFDEBD",
    "#FFCC8C",
    "#FFBF5C",
    "#FFB72B",
    "#EF9504",
    "#B66B06",
    "#7F4606",
    "#492605",
  ],
  red: [
    "#FFF1F4",
    "#FAC1C1",
    "#F5928D",
    "#F0625A",
    "#EB3226",
    "#CF2012",
    "#A31A0D",
    "#771409",
    "#4A0D05",
  ],
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
  colors,
  space,
  fontSizes,
  fontWeights,
  lineHeights,
  breakpoints,
  boxShadow,
};
