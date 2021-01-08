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
      color: theme.colors.blue500,
      background: theme.colors.blue100,
    },
    orange: {
      color: theme.colors.orange900,
      background: theme.colors.orange100,
    },
    cyan: {
      color: theme.colors.cyan700,
      background: theme.colors.cyan100,
    },
  },
});

export const StyledTagPrefix = styled.div``;
export const StyledTagSuffix = styled.div``;

const size = variant({
  prop: "size",
  variants: {
    s: {
      height: "28px",
      borderRadius: 8,
      paddingX: 2,

      span: {
        fontSize: 14,
        letterSpacing: "-0.01rem",
      },

      [StyledTagPrefix]: {
        marginRight: 2,
      },

      [StyledTagSuffix]: {
        marginLeft: 2,
      },

      svg: {
        width: 16,
        height: 16,
      },
    },
    m: {
      height: "32px",
      borderRadius: 10,
      paddingX: 3,

      span: {
        fontSize: 15,
        letterSpacing: "-0.02rem",
      },

      [StyledTagPrefix]: {
        marginRight: 2,
      },

      [StyledTagSuffix]: {
        marginLeft: 2,
      },

      svg: {
        width: 20,
        height: 20,
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
  font-weight: 400;
`;

export default StyledTag;
