import { rgba, darken } from "polished";
import styled, { css } from 'styled-components';
import { Icon } from "../Icon/styles";

const STYLES = {
  "yellow": css`
    color: #2B3169;
    background: #FFDA91;
  `,
  "green": css`
    color: #2B3169;
    background: #57E1C8;
  `,
  "blue": css`
    color: ${darken(0.3, "#173FCD")};
    background: ${rgba("#173FCD", 0.12)};
  `
}

export const Status = styled.span`
  height: 20px;
  color: #1D274B;
  font-size: 12px;
  padding: 0 10px;
  font-weight: 500;
  line-height: 20px;
  border-radius: 10px;
  align-items: center;
  display: inline-flex;
  /* text-transform: uppercase; */
  background: rgba(29, 39, 75, 0.06);

  ${props => STYLES[props.styling]}

  ${Icon} {
    margin-right: 0px;
    margin-left: -8px;
    display: inline-flex;
  }
`