import { rgba } from "polished";
import styled, { css } from "styled-components";
import { theme } from "@advisable/donut";

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
`;

export const NoticeIcon = styled.div`
  top: 50%;
  left: 16px;
  width: 20px;
  height: 20px;
  position: absolute;
  transform: translateY(-50%);
  color: ${colors.neutral[7]};
  stroke-width: 2;
`;

export const Notice = styled.div`
  padding: 16px;
  font-size: 14px;
  border-radius: 4px;
  position: relative;
  color: ${colors.neutral[9]};
  background: ${colors.neutral[0]};
  border-top: 4px solid ${colors.neutral[1]};

  ${(props) => props.hasIcon && withIcon};
  ${(props) => props.elevation && ELEVATION[props.elevation]};
`;

export default Notice;
