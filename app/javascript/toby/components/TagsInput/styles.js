import styled from "styled-components";
import { StyledInput, StyledTag } from "@advisable/donut";

export const StyledTagsInput = styled(StyledInput)`
  min-height: 40px;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 8px;
  padding-right: 8px;
  flex-wrap: wrap;
  align-items: center;

  ${StyledTag} {
    margin-top: 2px;
    margin-right: 4px;
    margin-bottom: 2px;
  }
`;

export const StyledTagsInputControl = styled.input`
  border: none;
  outline: none;
  font-size: 16px;
  appearance: none;
  background: transparent;
  font-family: TTHoves, sans-serif;
`;
