import styled from "styled-components";
import { margin, variant } from "styled-system";
import theme from "../../theme";

const badgeVariants = variant({
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
  ${badgeVariants}

  padding: 4px 8px;
  font-size: 12px;
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
    width: 16px;
    height: 16px;
  }
`;

export const StyledBadgeSuffix = styled.div`
  margin-left: 4px;
`;
