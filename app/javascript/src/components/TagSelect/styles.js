import { space } from "styled-system";
import styled, { css } from "styled-components";
import { theme } from "@advisable/donut";

export const StyledTagSelect = styled.div`
  ${space}
  margin-top: -8px;
  margin-left: -8px;
`;

const selectedStyles = css`
  color: white;
  background: ${theme.colors.blue800};

  &:hover {
    color: white;
    background: ${theme.colors.blue800};
  }
`;

export const StyledTagSelectTag = styled.div`
  height: 36px;
  cursor: pointer;
  padding: 0 16px;
  font-size: 15px;
  margin-top: 8px;
  margin-left: 8px;
  font-weight: 400;
  user-select: none;
  align-items: center;
  border-radius: 20px;
  display: inline-flex;
  vertical-align: baseline;
  color: ${theme.colors.blue700};
  background: ${theme.colors.blue100};
  transition: background 100ms;

  @media (min-width: ${theme.breakpoints.s}) {
    height: 30px;
    font-size: 14px;
  }

  &:hover {
    color: ${theme.colors.blue800};
    background: ${theme.colors.blue100};
  }

  svg {
    margin-right: 8px;
  }

  ${(props) => props.selected && selectedStyles};
`;

export default StyledTagSelect;
