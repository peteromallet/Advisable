import { layout, space } from "styled-system";
import styled, { css } from "styled-components";
import theme from "../../theme";

function halfRems(rems) {
  if (!rems) return 0;
  const units = parseFloat(rems) / 2;
  return `${units}rem`;
}

export const StyledStack = styled.div`
  ${space}
  ${layout}
`;

const dividerStyles = css`
  border-bottom: 1px solid ${(p) => theme.colors[p.divider]};
`;

export const StyledStackItem = styled.div`
  padding-top: ${(p) => halfRems(theme.space[p.spacing]) || 0};
  padding-bottom: ${(p) => halfRems(theme.space[p.spacing]) || 0};
  ${(p) => p.divider && dividerStyles};

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
`;
