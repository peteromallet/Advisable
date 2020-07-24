import { rgba } from "polished";
import styled from "styled-components";
import {
  compose,
  space,
  layout,
  border,
  variant,
  typography,
} from "styled-system";
import theme from "../../theme";

const elevation = variant({
  prop: "elevation",
  variants: {
    none: {
      boxShadow: "none",
    },
    s: {
      boxShadow: `0 1px 2px ${rgba(theme.colors.neutral[8], 0.1)}`,
    },
    m: {
      boxShadow: `0 16px 32px -16px ${rgba(theme.colors.blue900, 0.12)}`,
    },
    l: {
      boxShadow: `0px 20px 80px rgba(26, 35, 67, 0.12)`,
    },
    xl: {
      boxShadow: `0 8px 60px ${rgba(
        theme.colors.neutral[9],
        0.2,
      )}, 0 2px 8px ${rgba(theme.colors.neutral[9], 0.1)}`,
    },
  },
});

const cardType = variant({
  variants: {
    bordered: {
      boxShadow: "none",
      background: "transparent",
      border: "1px solid #E1E2E9",
    },
  },
});

export const StyledCard = styled.div`
  ${compose(space, layout, border, elevation, typography)}

  outline: none;
  display: block;
  background: white;
  border-radius: 2px;

  ${cardType};
`;

export default StyledCard;
