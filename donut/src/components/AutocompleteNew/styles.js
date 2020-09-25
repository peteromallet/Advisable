import styled, { css } from "styled-components";
import { variant, space } from "styled-system";
import {
  BORDER_RADIUS,
  StyledInput,
  StyledInputControl,
  StyledInputDecoration,
} from "../Input/styles";
import theme from "../../theme";

export const StyledAutocomplete = styled.div`
  position: relative;
`;

export const StyledAutocompleteInput = styled(StyledInput)``;

export const StyledAutocompleteDecoration = styled(StyledInputDecoration)``;

export const StyledAutocompleteInputControl = styled(StyledInputControl)``;

export const StyledAutoCompleteMenu = styled.div`
  width: 100%;
  background: white;
  max-height: 300px;
  overflow-y: scroll;
  border-radius: 12px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.2);
`;

export const StyledAutocompleteMenuItem = styled.div`
  padding: 8px 12px;
  font-size: 15px;
`;
