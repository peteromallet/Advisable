import React from "react";
import { rgba } from "polished";
import styled from "styled-components";
import { layout, space, variant, padding } from "styled-system";
import { theme, Text, StyledCircle, Box } from "@advisable/donut";

export const StyledImageThumbnail = styled.div`
  ${layout};
  ${space}

  cursor: pointer;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
  background-color: ${theme.colors.neutral100};

  &:hover {
    filter: brightness(90%);
  }
`;

export const StyledTitle = styled(Text)``;
export const StyledMessage = styled(Text)``;

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

export const StyledButtonsPannel = (props) => (
  <Box pt={3} pb={1.5} {...props} />
);

export const VARIANTS = variant({
  variants: {
    neutral: {
      backgroundColor: "neutral100",
      svg: { color: "neutral600" },
      [StyledCircle]: { bg: "neutral200" },
      [StyledTitle]: { color: "neutral800" },
      [StyledMessage]: { color: "neutral600" },
      [StyledButton]: {
        color: rgba(theme.colors.neutral800, 0.85),
        borderBottomColor: rgba(theme.colors.neutral400, 0.8),
        "&:hover": {
          color: "neutral800",
          borderBottomColor: "neutral500",
        },
      },
    },
    red: {
      backgroundColor: "red100",
      svg: { color: "red600" },
      [StyledCircle]: { bg: "red200" },
      [StyledTitle]: { color: "red700" },
      [StyledMessage]: { color: "red700" },
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

export const StyledBadge = styled.div`
  ${padding}
  ${VARIANTS}

  svg {
    width: 20px;
    height: 20px;
  }

  font-weight: 400;
  border-radius: 12px;
  width: 100%;
  align-items: center;
`;
