import styled from "styled-components";
import { padding, variant } from "styled-system";
import { theme } from "@advisable/donut";

export const StyledBadgePrefix = styled.div`
  margin-right: 6px;

  svg {
    width: 16px;
    height: 16px;
    stroke-width: 2;
  }
`;

export const StyledTitle = styled.span`
  padding-top: 2px;
  font-size: 14px;
  font-weight: 500;
`;

export const StyledMessage = styled.p`
  font-size: 13px;
  line-height: 118%;
`;

export const VARIANTS = variant({
  variants: {
    neutral: {
      backgroundColor: theme.colors.neutral100,
      svg: { color: theme.colors.neutral500 },
      [StyledTitle]: { color: theme.colors.neutral900 },
      [StyledMessage]: { color: theme.colors.neutral700 },
    },
    yellow: {
      backgroundColor: theme.colors.yellow100,
      svg: { color: theme.colors.yellow700 },
      [StyledTitle]: { color: theme.colors.yellow900 },
      [StyledMessage]: { color: theme.colors.yellow900 },
    },
    red: {
      backgroundColor: theme.colors.red100,
      svg: { color: theme.colors.red500 },
      [StyledTitle]: { color: theme.colors.red600 },
      [StyledMessage]: { color: theme.colors.red600 },
    },
  },
});

export const StyledBadge = styled.div`
  ${padding}
  ${VARIANTS}
  
  font-weight: 400;
  border-radius: 12px;
  width: 100%;
  align-items: center;
`;
