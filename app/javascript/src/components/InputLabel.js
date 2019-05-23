import styled, { css } from "styled-components";

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
  color: #323a57;
  display: block;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  padding-bottom: 8px;
  ${props => props.hidden && hidden};
`;
