import styled from "styled-components";
import StyledRadio from "../Radio/styles";

export const StyledRadioGroup = styled.fieldset`
  ${StyledRadio} {
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export default StyledRadioGroup;
