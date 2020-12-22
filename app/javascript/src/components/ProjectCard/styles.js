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
      color: theme.colors.neutral600,
    },
    yellow: {
      color: theme.colors.yellow600,
    },
    red: {
      color: theme.colors.red400,
    },
  },
});

export const StyledBadge = styled.div`
  ${margin}
  ${VARIANTS}
  ${SIZES}
  
  font-weight: 400;
  font-size: 15px;
  padding: 16px 0px;
  width: 100%;
  align-items: center;
  display: inline-flex;
`;

export const StyledBadgePrefix = styled.div`
  margin-right: 12px;

  svg {
    width: 16px;
    height: 16px;
    stroke-width: 2;
  }
`;
