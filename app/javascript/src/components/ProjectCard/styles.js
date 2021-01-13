import styled from "styled-components";
import { padding, variant } from "styled-system";
import { theme } from "@advisable/donut";

export const StyledBadgePrefix = styled.div`
  margin-right: 8px;

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
  font-size: 12px;
  line-height: 118%;
`;

export const VARIANTS = variant({
  variants: {
    neutral: {
      backgroundColor: theme.colors.neutral100,
      svg: { color: theme.colors.neutral500 },
      [StyledTitle]: { color: theme.colors.neutral800 },
      [StyledMessage]: { color: theme.colors.neutral600 },
    },
    yellow: {
      backgroundColor: theme.colors.yellow100,
      svg: { color: theme.colors.yellow600 },
      [StyledTitle]: { color: theme.colors.yellow800 },
      [StyledMessage]: { color: theme.colors.yellow700 },
    },
    red: {
      backgroundColor: theme.colors.red100,
      svg: { color: theme.colors.red400 },
      [StyledTitle]: { color: theme.colors.red500 },
      [StyledMessage]: { color: theme.colors.red500 },
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
