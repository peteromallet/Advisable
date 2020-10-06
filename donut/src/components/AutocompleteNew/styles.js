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
  border-radius: 12px;
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
  text-align: center;
  color: ${theme.colors.neutral400};
`;

export const StyledAutocompleteMenuItem = styled.li`
  padding: 0 4px;
  font-size: 15px;
  user-select: none;
  cursor: default;

  span {
    display: block;
    font-size: 15px;
    border-radius: 10px;
    padding: 10px 12px;
    color: ${theme.colors.neutral900};
  }

  &[aria-selected="true"] span {
    background: ${theme.colors.blue100};
  }
`;
