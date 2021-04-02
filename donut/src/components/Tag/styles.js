import { darken } from "polished";
import { space, variant } from "styled-system";
import theme from "../../theme";
import styled from "styled-components";

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
    quartz: {
      color: theme.colors.blue900,
      background: "#DDDDE8",
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
    purple: {
      color: "#093233",
      background: "#D5CBF5",
    },
  },
});

export const StyledTagPrefix = styled.div``;
export const StyledTagSuffix = styled.div``;
export const StyledTagLabel = styled.span``;

const size = variant({
  prop: "size",
  variants: {
    xs: {
      height: "20px",
      borderRadius: 6,

      [StyledTagLabel]: {
        paddingX: 1,
        fontSize: 13,
        letterSpacing: "-0.02rem",
      },

      [StyledTagPrefix]: {
        marginLeft: 1,
      },

      [StyledTagSuffix]: {
        marginRight: 1,
      },
      svg: {
        width: 12,
        height: 12,
      },
      [StyledTagRemoveButton]: {
        padding: "0 2px",
        svg: { margin: 0 },
      },
    },
    s: {
      height: "24px",
      borderRadius: 8,

      [StyledTagLabel]: {
        paddingX: 2,
        fontSize: 14,
        letterSpacing: "-0.01rem",
      },
      [StyledTagPrefix]: {
        marginLeft: 2,
      },
      [StyledTagSuffix]: {
        marginRight: 2,
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

      [StyledTagLabel]: {
        paddingX: 3,
        fontSize: 15,
        letterSpacing: "-0.02rem",
      },

      [StyledTagPrefix]: {
        marginLeft: 3,
      },

      [StyledTagSuffix]: {
        marginRight: 3,
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

export default StyledTag;
