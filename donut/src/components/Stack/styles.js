import { space } from "styled-system";
import styled, { css } from "styled-components";
import theme from "../../theme";

export const StyledStack = styled.div`
  ${space}
`;

const dividerStyles = css`
  border-bottom: 1px solid ${(p) => theme.colors[p.divider]};
`;

export const StyledStackItem = styled.div`
  padding-top: ${(p) => (theme.space[p.spacing] || p.spacing) / 2}px;
  padding-bottom: ${(p) => (theme.space[p.spacing] || p.spacing) / 2}px;
  ${(p) => p.divider && dividerStyles};

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
`;
