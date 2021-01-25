import styled from "styled-components";
import {
  theme,
  Box,
  Textarea,
  StyledCheckbox,
  StyledCheckboxInner,
} from "@advisable/donut";

export const StyledPersistBio = styled(Box)`
  ${StyledCheckbox} {
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
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

export const StyledIntroduction = styled(Textarea)`
  padding-bottom: ${(props) => (props.isWidescreen ? "48px" : "64px")};
`;
