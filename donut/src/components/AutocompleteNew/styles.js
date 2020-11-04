import styled, { css } from "styled-components";
import theme from "../../theme";

export const StyledAutocomplete = styled.div`
  position: relative;
`;

const StyledAutocompleteMenu_Closed = css`
  visibility: hidden;
  pointer-events: none;
`;

export const StyledAutocompleteMenu = styled.div`
  margin: 0px;
  z-index: 1000;
  min-width: 100%;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: white;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.2);

  ${(p) => !p.$isOpen && StyledAutocompleteMenu_Closed};
`;

export const StyledAutocompleteMenuList = styled.ul`
  outline: none;
  list-style: none;
  padding: 4px 0px;
  overflow-y: auto;
  max-height: 300px;
`;

export const StyledAutocompleteNoResults = styled.div`
  padding: 20px;
  user-select: none;
  text-align: center;
  color: ${theme.colors.neutral400};
`;

export const StyledAutocompleteLoading = styled.div`
  padding: 20px;
  user-select: none;
  text-align: center;
  color: ${theme.colors.neutral400};
`;

export const StyledAutocompleteMenuItem = styled.li`
  padding: 0;
  user-select: none;
  cursor: default;

  &:first-child {
    margin-top: 4px;
  }

  &:last-child {
    margin-bottom: 4px;
  }

  span {
    display: block;
    font-size: 14px;
    padding: 12px 12px;
    color: ${theme.colors.neutral800};
  }

  &[aria-selected="true"] span {
    color: ${theme.colors.neutral900};
    background: ${theme.colors.neutral100};
  }
`;
