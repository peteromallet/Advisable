import { rgba, darken } from "polished";
import { space, variant } from "styled-system";
import theme from "../../theme";
import styled from "styled-components";

const color = variant({
  variants: {
    neutral: {
      color: theme.colors.neutral800,
      background: theme.colors.neutral100,
      [StyledTagRemoveButton]: {
        background: darken(0.04, theme.colors.neutral100),
        "&:hover": {
          background: darken(0.05, theme.colors.neutral200),
        },
      },
    },
    dark: {
      color: theme.colors.white,
      background: theme.colors.blue900,
      [StyledTagRemoveButton]: {
        background: "rgba(255, 255, 255, 0.1)",
        "&:hover": {
          background: "rgba(255, 255, 255, 0.15)",
        },
      },
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

export const StyledTagRemoveButton = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  background: ${theme.colors.neutral200};

  &:hover {
    background: ${theme.colors.neutral300};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

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
      [StyledTagRemoveButton]: {
        padding: "0 4px",
      },

      svg: {
        width: 16,
        height: 16,
      },
      [StyledTagRemoveButton]: {
        padding: "0 6px",
        svg: { margin: 0 },
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

      [StyledTagRemoveButton]: {
        padding: "0 6px",
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

  font-weight: 500;
  overflow: hidden;
  user-select: none;
  align-items: center;
  display: inline-flex;
`;

export const StyledTagText = styled.span`
  font-weight: 400;
`;

export default StyledTag;
