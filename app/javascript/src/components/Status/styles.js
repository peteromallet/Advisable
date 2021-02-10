import { rgba, darken } from "polished";
import styled, { css } from "styled-components";

const STYLES = {
  yellow: css`
    color: #2b3169;
    background: #ffda91;
  `,
  green: css`
    color: #2b3169;
    background: #57e1c8;
  `,
  blue: css`
    color: ${darken(0.3, "#173FCD")};
    background: ${rgba("#173FCD", 0.12)};
  `,
};

export const Status = styled.span`
  height: 20px;
  color: #1d274b;
  font-size: 11px;
  padding: 0 10px;
  font-weight: 600;
  line-height: 20px;
  border-radius: 6px;
  align-items: center;
  display: inline-flex;
  text-transform: uppercase;
  background: rgba(29, 39, 75, 0.06);

  ${(props) => STYLES[props.styling]}

  svg {
    width: 16px;
    height: 16px;
    stroke-width: 2;
    margin-right: 4px;
    margin-left: -8px;
    display: inline-flex;
  }
`;
