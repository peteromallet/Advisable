import { rgba } from "polished";
import { guildColors } from "./guild/theme";

// Breakpoints
const breakpoints = ["640px", "768px", "1024px", "1280px"];
breakpoints.s = breakpoints[0];
breakpoints.m = breakpoints[1];
breakpoints.l = breakpoints[2];
breakpoints.xl = breakpoints[3];

// Spacing
// You should prefer the sizes 'sm' over 's' and 'md' over 'm' as well as '3xl'
// over 'xxxl'
const space = [0, 4, 8, 12, 16, 24, 32, 40, 48, 64, 96];
space.none = space[0];
space["2xs"] = space[1];
space.xxs = space[1];
space.xs = space[2];
space.s = space[3];
space.sm = space[3];
space.m = space[4];
space.md = space[4];
space.l = space[5];
space.lg = space[4];
space.xl = space[6];
space.xxl = space[7];
space["2xl"] = space[7];
space.xxxl = space[8];
space["3xl"] = space[8];
space["4xl"] = space[9];
space["5xl"] = space[10];

// Font sizes
const fontSizes = {
  xxs: 12,
  "2xs": 12,
  xs: 14,
  s: 15,
  sm: 15,
  m: 16,
  md: 16,
  l: 18,
  lg: 18,
  xl: 20,
  "2xl": 22,
  xxl: 22,
  "3xl": 24,
  xxxl: 24,
  "4xl": 28,
  xxxxl: 28,
  "5xl": 32,
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

const fonts = {
  body: "TTHoves, poppins, sans-serif",
  heading: "TTNormsPro, poppins, sans-serif",
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
  white: "#FFFFFF",
  neutral50: "#F9F9F9",
  neutral100: "#EEEEF0",
  neutral200: "#E2E2E4",
  neutral300: "#CCCCD1",
  neutral400: "#AFAFB5",
  neutral500: "#93939B",
  neutral600: "#73737A",
  neutral700: "#55555F",
  neutral800: "#31313A",
  neutral900: "#1C1C25",
  blue50: "#F2F4FF",
  blue100: "#E7EAFF",
  blue200: "#C0C9FC",
  blue300: "#8594F1",
  blue400: "#5B6EE3",
  blue500: "#234EE4",
  blue600: "#1038C7",
  blue700: "#1529A5",
  blue800: "#101E71",
  blue900: "#1E234E",
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
  ...guildColors,
};

const shadows = {
  xs: `0 1px 3px ${rgba(colors.blue900, 0.15)}`,
  s: `0 2px 6px ${rgba(colors.blue900, 0.15)}`,
  m: `0 4px 12px ${rgba(colors.blue900, 0.1)}`,
  l: `0 8px 20px ${rgba(colors.blue900, 0.2)}`,
};

export default {
  background: "default",
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
