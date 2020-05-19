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
      boxShadow: `0px 16px 40px rgba(5, 12, 37, 0.06), 0px 4px 8px rgba(12, 18, 46, 0.05)`,
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

export const StyledCard = styled.div`
  ${compose(space, layout, border, elevation, typography)}

  outline: none;
  background: white;
  border-radius: 2px;
`;

export default StyledCard;
