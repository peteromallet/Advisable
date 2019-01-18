import styled, { css } from "styled-components";
import { withSpacing } from "src/components/Spacing";
import { rgba } from "polished";

const shadowColor = rgba("#0A1745", 0.1);
const size = "10px";

const topShadow = active => {
  if (!active) return null;

  return css`
    &::before {
      content: "";
      top: 0;
      left: 0;
      height: 10px;
      width: 100%;
      position: absolute;
      box-shadow: inset 0 ${size} ${size} -${size} ${shadowColor};
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
      height: 10px;
      width: 100%;
      position: absolute;
      box-shadow: inset 0 -${size} ${size} -${size} ${shadowColor};
    }
  `;
};

export const ScrollableContainer = styled.div`
  display: flex;
  position: relative;
  align-items: stretch;
  ${props => topShadow(props.topShadow)};
  ${props => bottomShadow(props.bottomShadow)};
`;

let ScrollInner = styled.div.attrs(props => ({
  style: {
    height: props.height ? `${props.height}px` : "auto"
  }
}))`
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

ScrollInner = withSpacing(ScrollInner);
export { ScrollInner };
