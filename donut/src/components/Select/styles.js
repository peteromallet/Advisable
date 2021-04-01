import styled, { css } from "styled-components";
import { space } from "styled-system";
import {
  BORDER_RADIUS,
  StyledInput,
  StyledInputControl,
  StyledInputDecoration,
} from "../Input/styles";
import theme from "../../theme";

export const StyledSelectControl = styled(StyledInputControl)`
  appearance: none;
`;

export const StyledSelectDecoration = styled(StyledInputDecoration)``;

export const StyledSelectControlWraper = styled.div`
  width: 100%;
  display: flex;
  position: relative;

  ${StyledSelectControl} {
    border-radius: 0;
  }

  &:first-child ${StyledSelectControl} {
    border-top-left-radius: ${BORDER_RADIUS}px;
    border-bottom-left-radius: ${BORDER_RADIUS}px;
  }

  &:last-child ${StyledSelectControl} {
    border-top-right-radius: ${BORDER_RADIUS}px;
    border-bottom-right-radius: ${BORDER_RADIUS}px;
  }
`;

export const StyledSelectArrow = styled.div`
  top: 0;
  right: 12px;
  height: 100%;
  display: flex;
  position: absolute;
  align-items: center;
  color: ${theme.colors.neutral400};
`;

const StyledSelect_PlaceholderSelected = css`
  ${StyledSelectControl} {
    color: ${theme.colors.neutral300};
  }
`;

export const StyledSelect = styled(StyledInput)`
  ${space}

  ${(props) => props.$placeholderSelected && StyledSelect_PlaceholderSelected};
`;

export default StyledSelect;
