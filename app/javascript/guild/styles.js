import styled, { css } from "styled-components";
import { theme, Box } from "@advisable/donut";

/* 
  Responsive utilities
*/

const { breakpoints } = theme;
const minBreakpoints = [
  { name: "xsmall", min: 0 },
  { name: "small", min: breakpoints.s },
  { name: "medium", min: breakpoints.m },
  { name: "large", min: breakpoints.l },
  { name: "xlarge", min: breakpoints.xl },
];

const breakpoint = (() => {
  const media = {};
  minBreakpoints.map(({ name, min }) => {
    media[`${name}AndUp`] = `@media (min-width: ${min})`;
  });

  return media;
})();

/* 
  Flex utilities
*/

const flexStaticUtils = {
  flexSpaceBetween: css`
    display: flex;
    justify-content: space-between;
  `,
  flexCenterHorizontal: css`
    display: flex;
    justify-content: center;
  `,
  flexCenterVertical: css`
    display: flex;
    align-items: center;
  `,
  flexCenterBoth: css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  flexStatic: css`
    flex-grow: 0;
    flex-shrink: 0;
  `,
  flexColumnGrow: css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  `,
  flexTruncate: css`
    flex-wrap: nowrap;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  `,
};

const spaceChildrenHorizontal = (margin) => css`
  display: flex;
  & > * {
    margin-right: ${margin}px;
  }
  & > *:last-child {
    margin-right: 0;
  }
`;

const spaceChildrenVertical = (margin) => css`
  display: flex;
  flex-direction: column;
  & > * {
    margin-bottom: ${margin}px;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
`;

/* 
    1. Horizontal ${margin} except for last child
    2. When flex wrapped then add top ${margin}
  */
const wrapChildrenBoth = (margin) => css`
  ${spaceChildrenHorizontal(margin)}
  margin: -${margin}px 0 0 0;
  & > * {
    margin-top: ${margin}px;
  }
`;

const flex = {
  ...flexStaticUtils,
  spaceChildrenVertical,
  spaceChildrenHorizontal,
  wrapChildrenBoth,
};

/* 
  Box utility
*/

const GuildBox = styled(Box)`
  ${({ spaceChildrenVertical: margin }) =>
    margin && spaceChildrenVertical(margin)}

  ${({ spaceChildrenHorizontal: margin }) =>
    margin && spaceChildrenHorizontal(margin)}
  
  ${({ wrapChildrenBoth: margin }) => margin && wrapChildrenBoth(margin)}

  ${({ flexCenterBoth }) => flexCenterBoth && flexStaticUtils.flexCenterBoth}

  ${({ flexSpaceBetween }) =>
    flexSpaceBetween && flexStaticUtils.flexSpaceBetween}
`;

export { flex, breakpoint, GuildBox };
