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
    blue: {
      color: theme.colors.blue900,
      background: theme.colors.blue100,
    },
    orange: {
      color: theme.colors.orange900,
      background: theme.colors.orange100,
    },
    cyan: {
      color: theme.colors.cyan900,
      background: theme.colors.cyan100,
    },
  },
});

const size = variant({
  prop: "size",
  variants: {
    s: {
      height: 28,
      fontSize: 13,
      borderRadius: 8,
      padding: "0 12px",
      letterSpacing: "-0.01rem",

      svg: {
        width: 16,
        height: 16,
        marginRight: "2",
      },
    },
    m: {
      height: 32,
      fontSize: 15,
      borderRadius: 10,
      padding: "0 16px",
      letterSpacing: "-0.02rem",

      svg: {
        width: 20,
        height: 20,
        marginRight: "2",
      },
    },
  },
});

export const StyledTag = styled.div`
  ${space};
  ${color};
  ${size};

  font-weight: 500;
  align-items: center;
  display: inline-flex;
`;

export default StyledTag;
