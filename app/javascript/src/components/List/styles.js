import styled from "styled-components";
import { margin, typography, color } from "styled-system";

export const StyledList = styled.ul`
  ${margin}
  ${typography}
  ${color}

  padding-left: 18px;
  list-style: disc outside none;
`;

export const StyledListItem = styled.li`
  margin-bottom: 8px;
`;
