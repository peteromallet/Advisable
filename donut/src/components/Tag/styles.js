import { space, variant } from "styled-system";
import theme from "../../theme";
import styled from "styled-components";

const color = variant({
  variants: {
    neutral: {
      color: theme.colors.blue900,
      background: "#EFF0F3",
    },
    dark: {
      color: theme.colors.white[9],
      background: theme.colors.blue900,
    },
  },
});

const size = variant({
  prop: "size",
  variants: {
    s: {
      fontSize: 13,
      padding: "6px 12px",
      letterSpacing: "-0.01rem",
      borderRadius: 8,
    },
    m: {
      fontSize: 14,
      padding: "9px 16px",
      letterSpacing: "-0.02rem",
      borderRadius: 12,
    },
  },
});

export const StyledTag = styled.div`
  ${space};
  ${color};
  ${size};

  font-weight: 500;
  display: inline-flex;
`;

export default StyledTag;
