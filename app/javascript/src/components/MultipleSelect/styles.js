import styled from "styled-components";
import { margin } from "styled-system";
import { theme, StyledInput } from "@advisable/donut";

export const StyledMultipleSelectTag = styled.div`
  color: white;
  font-size: 14px;
  padding: 8px 12px;
  margin-right: 8px;
  margin-bottom: 8px;
  border-radius: 12px;
  background: #253258;
  display: inline-block;
`;

export const StyledMultipleSelect = styled(StyledInput).attrs((p) => ({
  as: "div",
}))`
  input {
    margin: 0;
    width: 100%;
    border: none;
    outline: none;
    font-size: 15px;
    line-height: 1;
    font-weight: 500;
    background: transparent;
    font-family: poppins, sans-serif;

    &::placeholder {
      color: ${theme.colors.neutral[6]};
    }
  }
`;
