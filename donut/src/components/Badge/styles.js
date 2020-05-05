import styled from "styled-components";
import { margin, variant } from "styled-system";
import theme from "../../theme";

const badgeVariants = variant({
  variants: {
    cyan: {
      color: "#FFFFFF",
      bg: theme.colors.cyan600,
    },
    neutral: {
      color: theme.colors.blue900,
      bg: theme.colors.neutral100,
    },
    orange: {
      color: theme.colors.orange900,
      bg: theme.colors.orange200,
    },
  },
});

export const StyledBadge = styled.div`
  ${margin}
  ${badgeVariants}

  height: 24px;
  padding: 0 8px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  align-items: center;
  display: inline-flex;
  letter-spacing: -0.01rem;
`;

export const StyledBadgePrefix = styled.div`
  margin-right: 4px;

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const StyledBadgeSuffix = styled.div`
  margin-left: 4px;
`;
