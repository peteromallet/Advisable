import styled, { css } from "styled-components";
import { margin } from "styled-system";
import theme from "../../theme";

const StyledInput_WithError = css`
  border: 2px solid ${theme.colors.red200};
  background: ${theme.colors.red50};
`;

export const StyledInput = styled.input`
  margin: 0;
  outline: none;
  font-size: 16px;
  font-weight: 500;
  box-shadow: none;
  border-radius: 8px;
  appearance: none;
  padding: 8px 12px 10px 12px;
  color: ${theme.colors.neutral[9]};
  background: ${theme.colors.neutral[1]};
  width: ${(props) => props.width || "100%"};
  border: 2px solid ${theme.colors.neutral[1]};
  font-family: poppins, sans-serif;
  line-height: 1;

  ${margin}

  &::placeholder {
    color: ${theme.colors.neutral[6]};
  }

  &:focus {
    border-color: ${theme.colors.blue800};
    background: ${theme.colors.neutral50};
  }

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ${(props) => props.error && StyledInput_WithError};
`;

export const StyledInputDecorator = styled.div`
  display: flex;
  flex-shrink: 0;
  font-weight: 500;
  font-size: 15px;
  align-items: center;
  padding: 8px 0 10px 0;
  letter-spacing: -0.02em;
  color: ${theme.colors.neutral[7]};
  background: ${theme.colors.neutral[2]};

  &:first-child {
    padding-left: 16px;
    padding-right: 12px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  &:last-child {
    padding-left: 12px;
    padding-right: 16px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

export const StyledInputDecorationsChildren = styled.div`
  width: 100%;
`;

export const StyledInputDecorations = styled.div`
  display: flex;

  ${StyledInputDecorationsChildren} {
    flex-grow: 1;
    flex-shrink: 1;
    position: relative;

    ${StyledInput} {
      border-radius: 0;
    }

    &:first-child ${StyledInput} {
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    }

    &:last-child ${StyledInput} {
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }
`;

export default StyledInput;
