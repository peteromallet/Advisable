import styled, { css } from "styled-components";
import { variant, space } from "styled-system";
import {
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
  position: relative;

  ${StyledSelectControl} {
    border-radius: 0;
  }

  &:first-child ${StyledSelectControl} {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  &:last-child ${StyledSelectControl} {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

const arrowPadding = variant({
  prop: "size",
  variants: {
    sm: {
      padding: "0 12px",
    },
    md: {
      padding: "0 16px",
    },
    lg: {
      padding: "0 16px",
    },
  },
});

export const StyledSelectArrow = styled.div`
  top: 0;
  right: 0;
  height: 100%;
  display: flex;
  padding: 0 12px;
  position: absolute;
  align-items: center;
  color: ${theme.colors.neutral400};

  ${arrowPadding}
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
