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
  background: ${theme.colors.blue[8]};

  &:hover {
    color: white;
    background: ${theme.colors.blue[8]};
  }
`;

export const StyledTagSelectTag = styled.div`
  height: 30px;
  cursor: pointer;
  padding: 0 16px;
  font-size: 14px;
  margin-top: 8px;
  margin-left: 8px;
  font-weight: 400;
  user-select: none;
  align-items: center;
  border-radius: 15px;
  display: inline-flex;
  vertical-align: baseline;
  color: ${theme.colors.blue[7]};
  background: ${theme.colors.blue[0]};
  transition: background 100ms;

  &:hover {
    color: ${theme.colors.blue[8]};
    background: ${theme.colors.blue[1]};
  }

  svg {
    margin-right: 8px;
  }

  ${props => props.selected && selectedStyles};
`;

export default StyledTagSelect;
