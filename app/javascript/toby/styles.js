import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const StyledRow = styled.div`
  display: flex;
  border-bottom: 1px solid #ccc;

  &:hover {
    cursor: pointer;
    background: #eee;
  }
`;

export const StyledCell = styled.div`
  width: 200px;
  padding: 10px;
  overflow: hidden;
  white-space: nowrap;
  border-right: 1px solid #ccc;
`;

export const StyledNavigation = styled.div`
  background: #ddd;
  padding: 20px 20px 0 20px;
`;

export const StyledNavLink = styled(NavLink)`
  font-size: 16px;
  padding: 6px 12px;
  background: white;
  margin-right: 4px;
  display: inline-block;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;
