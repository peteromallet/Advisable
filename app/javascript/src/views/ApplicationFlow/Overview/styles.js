import styled from "styled-components";
import {
  theme,
  Box,
  StyledTextarea,
  StyledCheckbox,
  StyledCheckboxInner,
} from "@advisable/donut";

export const StyledComposer = styled(Box)`
  position: relative;
  ${StyledTextarea} {
    textarea {
      padding-bottom: 40px;
    }
  }

  ${StyledCheckbox} {
    position: absolute;
    bottom: 16px;
    left: 16px;
    right: 16px;
    padding: 8px;
    border-radius: 8px;
    background: white;
    box-shadow: ${theme.shadows.xs};
    transition: 0.2s box-shadow;
    &:hover {
      box-shadow: ${theme.shadows.s};
    }
    &:hover ${StyledCheckboxInner} {
      background: transparent;
    }
  }

  ${StyledCheckboxInner} {
    display: flex;
    padding: 0;
    margin: 0;
  }
`;
