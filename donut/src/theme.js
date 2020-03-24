import find from "lodash/find";
import { rgba } from "polished";
import isObject from "lodash/isObject";

// Breakpoints
const breakpoints = ["640px", "768px", "1024px", "1280px"];
breakpoints.s = breakpoints[0];
breakpoints.m = breakpoints[1];
breakpoints.l = breakpoints[2];
breakpoints.xl = breakpoints[3];

// Spacing
const space = [0, 4, 8, 16, 20, 32, 40, 60, 80, 100, 150];
space.none = space[0];
space.xxs = space[1];
space.xs = space[2];
space.s = space[3];
space.m = space[4];
space.l = space[5];
space.xl = space[6];
space.xxl = space[7];
space.xxxl = space[8];

const fonts = {
  body: "poppins, sans-serif",
  heading: "metropolis, poppins, sans-serif",
};

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
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extraBold: 800,
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
  // NEW COLORS USE A NUMERIC SCALE
  neutral50: "#F9FAFF",
  neutral100: "#E0E3EC",
  neutral200: "#CFD3DB",
  neutral300: "#B5B7C3",
  neutral400: "#8C8EA5",
  neutral500: "#717588",
  neutral600: "#4F5266",
  neutral700: "#3B3D54",
  neutral800: "#2A2C42",
  neutral900: "#1B1B35",
  blue50: "#F2F4FF",
  blue100: "#E7EAFF",
  blue200: "#C0C9FC",
  blue300: "#8594F1",
  blue400: "#5B6EE3",
  blue500: "#234EE4",
  blue600: "#1038C7",
  blue700: "#1529A5",
  blue800: "#101E71",
  blue900: "#070F40",
  cyan50: "#F2FAFA",
  cyan100: "#DCF4F4",
  cyan200: "#B3EBED",
  cyan300: "#87DBDE",
  cyan400: "#67D6DA",
  cyan500: "#2DCBD0",
  cyan600: "#15B9BE",
  cyan700: "#1B9EA3",
  cyan800: "#0D7275",
  cyan900: "#084446",
  green50: "#EFFBF7",
  green100: "#DAF4EB",
  green200: "#B1EAD5",
  green300: "#7FDBBA",
  green400: "#56CDA2",
  green500: "#24C78C",
  green600: "#19B57D",
  green700: "#139868",
  green800: "#147A56",
  green900: "#0D543A",
  yellow50: "#FFF9EE",
  yellow100: "#FCF0D8",
  yellow200: "#FFE6B5",
  yellow300: "#FFD788",
  yellow400: "#FAC254",
  yellow500: "#F0AC28",
  yellow600: "#CD9321",
  yellow700: "#B8831B",
  yellow800: "#986B12",
  yellow900: "#694806",
  orange50: "#FFF4EA",
  orange100: "#FFECDA",
  orange200: "#FFD9B6",
  orange300: "#FFC38B",
  orange400: "#FCA453",
  orange500: "#FF7A00",
  orange600: "#E76E00",
  orange700: "#CA6100",
  orange800: "#AC5300",
  orange900: "#823E00",
  red50: "#FFF0F1",
  red100: "#FFDDDF",
  red200: "#FFB9BD",
  red300: "#F5888E",
  red400: "#E4565E",
  red500: "#C12730",
  red600: "#AE1A23",
  red700: "#8D1920",
  red800: "#740D13",
  red900: "#59050A",
  purple50: "#F8F5FF",
  purple100: "#EEE8FF",
  purple200: "#D2C2FE",
  purple300: "#A587F3",
  purple400: "#8C69E8",
  purple500: "#6F44E1",
  purple600: "#4D1FC9",
  purple700: "#3B159F",
  purple800: "#2B0F76",
  purple900: "#1B0751",
  // OLD COLORS
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
    "#F2F3F8",
    "#E8EAF1",
    "#DEE0E8",
    "#CFD1DA",
    "#B6B8C0",
    "#92949D",
    "#6A6C75",
    "#40424A",
    "#171722",
  ],
  blue: [
    "#F0F2FF",
    "#DDE2FF",
    "#B3BDF5",
    "#8492E8",
    "#5168EE",
    "#0425E8",
    "#0621C3",
    "#05138F",
    "#00155D",
    "#01073D",
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
  orange: [
    "#FFF8F1",
    "#FFF2E7",
    "#FFE2C8",
    "#FFC693",
    "#FFA552",
    "#FF7A00",
    "#DF6B00",
    "#AD5300",
    "#783A00",
    "#3F1E00",
  ],
};

const shadows = {
  xs: `0 1px 3px ${rgba(colors.blue[9], 0.15)}`,
  s: `0 2px 6px ${rgba(colors.blue[9], 0.15)}`,
  m: `0 4px 12px ${rgba(colors.blue[9], 0.1)}`,
  l: `0 8px 20px ${rgba(colors.blue[9], 0.2)}`,
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
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  breakpoints,
  boxShadow,
  shadows,
};
