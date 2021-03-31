import { rgba } from "polished";
import styled from "styled-components";
import { variant } from "styled-system";
import { StyledCircle, theme } from "@advisable/donut";

export const StyledProjectStatusSection = styled.div`
  /* border */
  border-top: 1px solid;
  border-top-color: ${theme.colors.neutral100};

  /* spacing */
  margin-top: ${theme.space[5]};
  padding-top: ${theme.space[6]};
  padding-bottom: ${theme.space[2]};

  ${StyledCircle} {
    grid-area: icon;
    width: 40px;
    height: 40px;
  }
  svg {
    width: 20px;
    height: 20px;
  }
`;

// Text Area
export const StyledTextWrapper = styled.div`
  grid-area: text;
`;
export const StyledTitle = styled.h5`
  margin-bottom: ${theme.space[0.5]};
  font-size: ${theme.fontSizes.md}px;
  font-weight: ${theme.fontWeights.medium};
  line-height: ${theme.lineHeights.m};
`;
export const StyledDescription = styled.p`
  font-size: ${theme.fontSizes.sm}px;
  line-height: ${theme.lineHeights.xs};
`;

// Buttons area
export const StyledButtonsWrapper = styled.div`
  grid-area: buttons;
  padding-top: ${theme.space[3]};
  padding-bottom: ${theme.space[1.5]};
`;
export const StyledButton = styled.button`
  border: 0px;
  border-bottom: 2px solid;
  margin-right: 20px;
  font-family: TTHoves;
  font-size: 16px;
  font-weight: 500;
  padding: 4px 0;
  cursor: pointer;
  background: transparent;
  transition: 0.2s border-color, 0.2s color;
`;

// Copy URL area
export const StyledURLWrapper = styled.div`
  grid-column-start: 1;
  grid-column-end: span 2;
  grid-row-start: 2;
  grid-row-end: span 1;
  padding-top: ${theme.space[3]};
  /* padding-bottom: ${theme.space[1.5]}; */
`;

// Prompt box
const color = variant({
  prop: "color",
  variants: {
    neutral: {
      bg: "neutral100",
      [StyledCircle]: { bg: "neutral200" },
      svg: { color: "neutral600" },
      [StyledTitle]: { color: "neutral800" },
      [StyledDescription]: { color: "neutral600" },
      [StyledButton]: {
        color: rgba(theme.colors.neutral800, 0.85),
        borderBottomColor: rgba(theme.colors.neutral400, 0.8),
        "&:hover": {
          color: "neutral800",
          borderBottomColor: "neutral500",
        },
      },
    },
    yellow: {
      backgroundColor: "yellow100",
      [StyledCircle]: { bg: "yellow200" },
      svg: { color: "yellow800" },
      [StyledTitle]: { color: "yellow900" },
      [StyledDescription]: { color: "yellow900" },
      [StyledButton]: {
        color: rgba(theme.colors.yellow700, 0.9),
        borderBottomColor: rgba(theme.colors.yellow500, 0.75),
        "&:hover": {
          color: "yellow700",
          borderBottomColor: "yellow500",
        },
      },
    },
    blue: {
      bg: "blue100",
      [StyledCircle]: { bg: "blue200" },
      svg: { color: "blue700" },
      [StyledTitle]: { color: "blue800" },
      [StyledDescription]: { color: "blue800" },
      [StyledButton]: {
        color: rgba(theme.colors.blue600, 0.9),
        borderBottomColor: rgba(theme.colors.blue400, 0.75),
        "&:hover": {
          color: "blue600",
          borderBottomColor: "blue500",
        },
      },
    },
    red: {
      backgroundColor: "red100",
      [StyledCircle]: { bg: "red200" },
      svg: { color: "red600" },
      [StyledTitle]: { color: "red700" },
      [StyledDescription]: { color: "red700" },
      [StyledButton]: {
        color: rgba(theme.colors.red500, 0.9),
        borderBottomColor: rgba(theme.colors.red300, 0.75),
        "&:hover": {
          color: "red500",
          borderBottomColor: "red400",
        },
      },
    },
  },
});

export const StyledPromptBox = styled.div`
  ${color}
  /* grid */
  display: grid;
  grid-template-columns: 40px auto;
  grid-template-rows: auto auto;
  grid-column-gap: ${theme.space[3]};
  grid-template-areas:
    "icon text"
    "icon buttons";
  border-radius: 12px;
  width: 100%;
  padding: ${theme.space[3]};
`;
