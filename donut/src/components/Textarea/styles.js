import styled from "styled-components";
import { StyledInput, StyledInputControl } from "../Input/styles";

export const StyledTextarea = styled(StyledInput)``;

export const StyledTextareaControl = styled(StyledInputControl)`
  margin: 0;
  resize: none;
  line-height: 1.2em;
  padding-top: 16px;
  padding-bottom: 16px;
  height: auto !important;
`;

export default StyledTextarea;
