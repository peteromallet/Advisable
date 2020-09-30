import styled, { css } from "styled-components";
import theme from "../../theme";

export const StyledAutocomplete = styled.div`
  position: relative;
`;

const StyledAutocompleteMenu_Closed = css`
  visibility: hidden;
  pointer-events: none;
`;

export const StyledAutocompleteMenu = styled.ul`
  width: 100%;
  outline: none;
  padding: 4px 0;
  background: white;
  max-height: 300px;
  overflow-y: scroll;
  border-radius: 12px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.2);
  ${(p) => !p.$isOpen && StyledAutocompleteMenu_Closed};
`;

export const StyledAutocompleteMenuItem = styled.li`
  padding: 0 4px;
  font-size: 15px;
  user-select: none;

  span {
    display: block;
    font-size: 15px;
    border-radius: 10px;
    padding: 10px 12px;
    color: ${(p) =>
      p.$isSelected ? theme.colors.blue900 : theme.colors.neutral900};
    background: ${(p) =>
      p.$isSelected ? theme.colors.blue100 : "transparent"};
  }
`;
