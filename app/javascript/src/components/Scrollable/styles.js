import styled, { css } from "styled-components";
import { rgba } from "polished";
import { theme } from "@advisable/donut";

const shadowColor = rgba(theme.colors.neutral[8], 0.1);
const size = "30px";

const topShadow = active => {
  if (!active) return null;

  return css`
    &::before {
      content: "";
      top: 0;
      left: 0;
      height: 30px;
      width: 100%;
      position: absolute;
      pointer-events: none;
      box-shadow: inset 0 ${size} ${size} -${size} ${shadowColor},
        inset 0 2px 2px ${rgba(theme.colors.neutral[8], 0.05)};
    }
  `;
};

const bottomShadow = active => {
  if (!active) return null;

  return css`
    &::after {
      content: "";
      left: 0;
      bottom: 0;
      z-index: 1;
      width: 100%;
      height: 30px;
      pointer-events: none;
      position: absolute;
      box-shadow: inset 0 -${size} ${size} -${size}
          ${rgba(theme.colors.neutral[8], 0.15)},
        inset 0 -2px 2px ${rgba(theme.colors.neutral[8], 0.05)};
    }
  `;
};

export const ScrollableContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-grow: 1;
  position: relative;
  align-items: stretch;
  flex-direction: column;
  ${props => topShadow(props.topShadow)};
  ${props => bottomShadow(props.bottomShadow)};
`;

export const ScrollInner = styled.div.attrs(props => ({
  style: {
    height: props.height ? `${props.height}px` : "auto",
  },
}))`
  flex: 1;
  width: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;
