import styled from "styled-components";
import { margin, variant } from "styled-system";
import theme from "../../theme";

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
    cyan: {
      color: theme.colors.cyan800,
      bg: theme.colors.cyan100,
    },
    neutral: {
      color: theme.colors.blue900,
      bg: theme.colors.neutral100,
    },
    orange: {
      color: theme.colors.orange800,
      bg: theme.colors.orange100,
    },
  },
});

export const StyledBadge = styled.div`
  ${margin}
  ${VARIANTS}
  ${SIZES}
  
  font-weight: 600;
  border-radius: 6px;
  align-items: center;
  display: inline-flex;
  letter-spacing: -0.01rem;
  text-transform: uppercase;
`;

export const StyledBadgePrefix = styled.div`
  margin-right: 4px;

  svg {
    width: 14px;
    height: 14px;
    stroke-width: 2;
  }
`;

export const StyledBadgeSuffix = styled.div`
  margin-left: 4px;
`;
