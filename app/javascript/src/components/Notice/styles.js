import { rgba } from "polished";
import styled, { css } from "styled-components";
import { theme } from "@advisable/donut";
import { Icon } from "../Icon/styles";

// Update this to use the same elevation values as the Card component in Donut.
const ELEVATION = {
  s: css`
    box-shadow: 0 1px 2px ${rgba(theme.colors.neutral[8], 0.1)};
  `,
  m: css`
    box-shadow: 0 5px 10px -5px ${rgba(theme.colors.neutral[8], 0.1)};
  `,
};

const colors = theme.colors;

const withIcon = css`
  padding-left: 48px;

  ${Icon} {
    top: 50%;
    left: 14px;
    position: absolute;
    color: ${colors.neutral[7]};
    transform: translateY(-50%);
  }
`;

export const Notice = styled.div`
  padding: 16px;
  font-size: 14px;
  border-radius: 4px;
  position: relative;
  color: ${colors.neutral[9]};
  background: ${colors.neutral[0]};
  border-top: 4px solid ${colors.neutral[1]};

  ${props => props.hasIcon && withIcon};
  ${props => props.elevation && ELEVATION[props.elevation]};
`;

export default Notice;
