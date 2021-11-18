import styled from "styled-components";
import { Box } from "@advisable/donut";
import theme from "../../theme";

export const StyledAutocomplete = styled.div`
  position: relative;
`;

export const StyledAutocompleteMenu = styled.div`
  margin: 0px;
  z-index: 1000;
  min-width: 100%;
  background-color: white;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 20px -8px;
`;

export const StyledAutocompleteMenuList = styled.ul`
  outline: none;
  list-style: none;
  padding: 4px 0px;
  overflow-y: auto;
  height: 100%;

  @media (min-width: ${theme.breakpoints.s}) {
    max-height: 300px;
  }
`;

export const StyledAutocompleteNoResults = styled.div`
  padding: 20px;
  user-select: none;
  text-align: center;
  color: ${theme.colors.neutral400};
`;

export const StyledAutocompleteLoading = styled.div`
  padding: 20px;
  font-size: 15px;
  user-select: none;
  text-align: center;
  color: ${theme.colors.neutral400};
`;

export const StyledAutocompleteMenuItem = styled.li`
  display: flex;
  cursor: default;
  user-select: none;
  padding: 10px 10px;
  align-items: center;

  &:first-child {
    margin-top: 4px;
  }

  &:last-child {
    margin-bottom: 4px;
  }

  &[aria-selected="true"] {
    color: ${theme.colors.neutral900};
    background: ${theme.colors.neutral100};
  }
`;

export const StyledComboxMobileContainer = styled(Box)`
  z-index: 9999;
  height: -moz-available; /* WebKit-based browsers will ignore this. */
  height: -webkit-fill-available; /* Mozilla-based browsers will ignore this. */
  height: fill-available;
`;
