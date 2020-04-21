import styled, { css } from "styled-components";
import { space } from "styled-system";
import StyledInput from "../Input/styles";
import theme from "../../theme";

export const StyledSelect = styled.div`
  ${space}

  position: relative;
  width: ${(props) => props.width || "100%"};
`;

export const StyledSelectArrow = styled.div`
  top: 0;
  bottom: 0;
  right: 10px;
  display: flex;
  position: absolute;
  align-items: center;
  color: ${theme.colors.neutral400};
`;

const placeholderStyles = css`
  color: ${theme.colors.neutral[6]};
`;

export const StyledSelectInput = styled(StyledInput).attrs({ as: "select" })`
  appearance: none;
  font-weight: 500;
  color: ${theme.colors.neutral900};

  ${(props) => props.placeholderSelected && placeholderStyles};
`;

export default StyledSelect;
