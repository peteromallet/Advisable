import { rgba } from "polished";
import { guildColors } from "./guild/theme";

// Breakpoints
const breakpoints = ["640px", "768px", "1024px", "1280px"];
breakpoints.s = breakpoints[0];
breakpoints.m = breakpoints[1];
breakpoints.l = breakpoints[2];
breakpoints.xl = breakpoints[3];

// Our spacing scale follows the same principle as tailwind. You need to think
// of the scale as units and not pixels. Each "unit" is 0.25rem which is 4px
// on a typical browser.
// https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
const space = {
  0: "0",
  0.5: "0.125rem", // 2px
  1: "0.25rem", // 4px
  1.5: "0.375rem", // 6px
  2: "0.5rem", // 8px
  2.5: "0.625rem", // 10px
  3: "0.75rem", // 12px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  7: "1.75rem", // 28px
  8: "2rem", // 32px
  9: "2.25rem", // 36px
  10: "2.5rem", // 40px
  11: "2.75rem", // 44px
  12: "3rem", // 48px
  13: "3.25rem", // 52px
  14: "3.5rem", // 56px
  15: "3.75rem", // 60px
  16: "4rem", // 64px
  17: "4.25rem", // 68px
  18: "4.5rem", // 72px
  19: "4.75rem", // 76px
  20: "5rem", // 80px

  // SUPPORT OLD VALUES
  none: "0",
  "2xs": "0.25rem",
  xxs: "0.25rem",
  xs: "0.5rem",
  s: "0.75rem",
  sm: "0.75rem",
  m: "1rem",
  md: "1rem",
  l: "1.5rem",
  lg: "1.5rem",
  xl: "2rem",
  xxl: "2.5rem",
  "2xl": "2.5rem",
  xxxl: "3rem",
  "3xl": "3rem",
  "4xl": "4rem",
};

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
  "6xl": 40,
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
  body: "TTHoves, sans-serif",
};

// Line heights
const lineHeights = {
  "2xs": "14px",
  xxs: "14px",
  xs: "17px",
  s: "19px",
  m: "22px",
  l: "24px",
  xl: "26px",
  xxl: "28px",
  "2xl": "28px",
  xxxl: "34px",
  "3xl": "34px",
  xxxxl: "36px",
  "4xl": "36px",
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
  neutral500: "#8F8F97",
  neutral600: "#6A6A73",
  neutral700: "#51515E",
  neutral800: "#353541",
  neutral900: "#1C1C25",
  blue50: "#F0F5FF",
  blue100: "#DEE9FF",
  blue200: "#B2CDFF",
  blue300: "#759CF9",
  blue400: "#4374F0",
  blue500: "#2954E8",
  blue600: "#113ACB",
  blue700: "#0127A9",
  blue800: "#021D77",
  blue900: "#031142",
  cyan50: "#EDFAF9",
  cyan100: "#D3F2F0",
  cyan200: "#B7E8E6",
  cyan300: "#92DBD9",
  cyan400: "#78D1D0",
  cyan500: "#5CBEBF",
  cyan600: "#3CA3A8",
  cyan700: "#25828F",
  cyan800: "#18677A",
  cyan900: "#0E4053",
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
  l: `0 8px 20px ${rgba(colors.neutral900, 0.2)}`,
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
