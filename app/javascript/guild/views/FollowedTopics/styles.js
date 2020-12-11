import styled from "styled-components";
import { theme } from "@advisable/donut";

export const StyledGuildTopic = styled.button`
  display: inline-flex;
  flex-shrink: 0;
  background: ${theme.colors.neutral100};
  padding: 8px;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  color: #2b2d5f;
  border: none;
  outline: none;
  font-size: 16px;

  &:hover {
    cursor: pointer;
  }
`;
