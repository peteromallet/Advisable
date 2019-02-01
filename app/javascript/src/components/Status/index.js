import { rgba, darken } from "polished";
import styled, { css } from "styled-components";

const STYLES = {
  "yellow": css`
    color: ${darken(0.5, "#FFC451")};
    background: ${rgba("#FFC451", 0.3)};
  `,
  "green": css`
    color: ${darken(0.5, "#17D89E")};
    background: ${rgba("#17D89E", 0.15)};
  `
}

const Status = styled.span`
  color: #1D274B;
  font-size: 14px;
  font-weight: 500;
  padding: 2px 12px;
  border-radius: 15px;
  background: rgba(29, 39, 75, 0.06);

  ${props => STYLES[props.styling]}
`

export default Status