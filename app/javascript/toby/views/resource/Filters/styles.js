import { StyledInput, StyledInputControl, Box, theme } from "@advisable/donut";
import styled from "styled-components";

export const StyledMenu = styled.ul``;

export const StyledMenuItem = styled.li`
  font-size: 15px;
  font-weight: 500;
  padding: 11px 16px 12px 16px;
  user-select: none;
  border-bottom: 1px solid ${theme.colors.neutral100};

  &:hover {
    background: ${theme.colors.neutral100};
  }
`;

export const StyledFilter = styled(Box)`
  ${StyledInput} {
    height: 32px;
    font-size: 14px;
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  ${StyledInputControl} {
    line-height: 1;
    font-size: 14px;
    padding-left: 12px;
  }
`;
