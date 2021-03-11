import { theme } from "@advisable/donut";
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
