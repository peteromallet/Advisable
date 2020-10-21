import styled, { css } from "styled-components";
import { variant, border, space } from "styled-system";
import { theme } from "@advisable/donut";
import { flex } from "@guild/styles";

const { colors } = theme;

const colorDefaults = {
  color: colors.catalinaBlue100,
  svg: {
    fill: colors.catalinaBlue100,
  },
};

const color = variant({
  variants: {
    cta: {
      background: colors.slateBlue,
      color: colors.white,
      svg: {
        fill: colors.white,
      },
    },
    light: {
      background: colors.aliceBlue,
      ...colorDefaults,
    },
    dark: {
      background: colors.lavender,
      ...colorDefaults,
    },
    needHelp: {
      background: colors.sunglow,
      ...colorDefaults,
    },
  },
});

const size = variant({
  prop: "size",
  variants: {
    s: {
      padding: "10px 12px",
    },
    m: {
      padding: "8px 14px",
      letterSpacing: "-0.01rem",
    },
    l: {
      padding: "5px 12px",
      width: "160px",
    },
  },
});

export const StyledTag = styled.div`
  ${color};
  ${size};
  ${space};
  ${border};

  font-size: 16px;
  max-height: 40px;
  border-radius: 30px;

  ${flex.spaceChildrenHorizontal(theme.space.xxs)}
  ${flex.flexCenterBoth}
  flex-shrink: 0;

  ${({ button }) =>
    button &&
    css`
      filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.08));
      cursor: pointer;
    `};
`;

export default StyledTag;
