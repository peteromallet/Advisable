import styled, { css } from "styled-components";
import colors from "../../colors";
import { Icon } from "../Icon/styles";

const withIcon = css`
  padding-left: 45px;

  ${Icon} {
    top: 50%;
    left: 14px;
    position: absolute;
    color: ${colors.neutral.s7};
    transform: translateY(-50%);
  }
`;

export const Notice = styled.div`
  padding: 16px;
  font-size: 14px;
  border-radius: 4px;
  position: relative;
  color: ${colors.neutral.s9};
  background: ${colors.neutral.s1};
  ${props => props.hasIcon && withIcon};
`;

export default Notice;
