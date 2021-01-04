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
    // Temporary variants
    skill: {
      color: "#3A6FF9",
      background: "#D9E6FF",
    },
    industry: {
      color: "#3CA3A8",
      background: "#CEF0ED",
    },
  },
});

const size = variant({
  prop: "size",
  variants: {
    s: {
      borderRadius: 8,

      span: {
        fontSize: 13,
        letterSpacing: "-0.01rem",
        padding: "8px 12px",
      },

      svg: {
        width: 16,
        height: 16,
        marginRight: "2",
      },
    },
    m: {
      borderRadius: 10,

      span: {
        fontSize: 15,
        letterSpacing: "-0.02rem",
        padding: "8px 16px",
      },

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

  align-items: center;
  display: inline-flex;
`;

export const StyledTagText = styled.span`
  font-weight: 500;
`;

export default StyledTag;
