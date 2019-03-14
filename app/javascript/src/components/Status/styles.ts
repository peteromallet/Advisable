import { rgba, darken } from "polished";
import styled, { css } from 'styled-components';
import { Icon } from "../Icon/styles";

const STYLES = {
  "yellow": css`
    color: ${darken(0.5, "#FFC451")};
    background: ${rgba("#FFC451", 0.3)};
  `,
  "green": css`
    color: ${darken(0.3, "#00CDB4")};
    background: ${rgba("#17D89E", 0.2)};
  `,
  "blue": css`
    color: ${darken(0.3, "#173FCD")};
    background: ${rgba("#173FCD", 0.12)};
  `
}

export const Status = styled.span`
  height: 22px;
  color: #1D274B;
  font-size: 14px;
  padding: 0 12px;
  font-weight: 500;
  line-height: 22px;
  border-radius: 15px;
  align-items: center;
  display: inline-flex;
  letter-spacing: 0.01rem;
  background: rgba(29, 39, 75, 0.06);

  ${props => STYLES[props.styling]}

  ${Icon} {
    margin-right: 4px;
    margin-left: -4px;
    display: inline-block;
  }
`