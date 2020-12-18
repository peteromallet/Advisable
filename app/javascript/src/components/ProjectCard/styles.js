import styled from "styled-components";
import { margin, variant } from "styled-system";
import { theme } from "@advisable/donut";

export const SIZES = variant({
  prop: "size",
  variants: {
    sm: {
      height: "16px",
      padding: "0 4px",
      fontSize: "11px",
    },
    md: {
      height: "20px",
      padding: "0 8px",
      fontSize: "12px",
    },
    lg: {
      height: "24px",
      padding: "0 12px",
      fontSize: "12px",
    },
  },
});

export const VARIANTS = variant({
  variants: {
    neutral: {
      borderColor: theme.colors.neutral500,
      color: theme.colors.neutral600,
    },
    yellow: {
      borderColor: theme.colors.yellow500,
      color: theme.colors.yellow600,
    },
    red: {
      borderColor: theme.colors.red500,
      color: theme.colors.red400,
    },
  },
});

export const StyledBadge = styled.div`
  ${margin}
  ${VARIANTS}
  ${SIZES}
  
  font-weight: 400;
  border-width: 1px;
  border-style: solid;
  font-size: 14px;
  margin-top: 16px;
  padding: 8px 12px;
  width: 100%;
  border-radius: 8px;
  align-items: center;
  display: inline-flex;
`;

export const StyledBadgePrefix = styled.div`
  margin-right: 12px;

  svg {
    width: 14px;
    height: 14px;
    stroke-width: 2;
  }
`;
