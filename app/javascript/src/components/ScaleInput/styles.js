import styled from "styled-components";
import { space } from "styled-system";
import { theme } from "@advisable/donut";

export const StyledScaleInput = styled.div`
  ${space};
`;

export const StyledScaleInputOption = styled.button`
  border: none;
  padding: 20px;
  outline: none;
  font-size: 18px;
  cursor: pointer;
  font-weight: 600;
  appearance: none;
  border-radius: 12px;
  color: ${theme.colors.neutral800};
  background: ${theme.colors.neutral100};

  &:hover {
    color: ${theme.colors.neutral900};
    background: ${theme.colors.neutral200};
  }

  &[data-selected="true"] {
    color: white;
    background: ${theme.colors.blue700};
  }
`;

export default StyledScaleInput;
