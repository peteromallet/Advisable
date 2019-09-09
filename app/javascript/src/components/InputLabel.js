import styled, { css } from "styled-components";
import { theme } from "@advisable/donut";

const hidden = css`
  top: 0;
  border: 0 !important;
  padding: 0 !important;
  width: 1px !important;
  height: 1px !important;
  overflow: hidden !important;
  position: absolute !important;
  clip: rect(1px, 1px, 1px, 1px) !important;
`;

export default styled.label`
  display: block;
  line-height: 1;
  font-size: 15px;
  font-weight: 500;
  padding-bottom: 8px;
  color: ${theme.colors.neutral[8]};
  ${props => props.hidden && hidden};
`;
