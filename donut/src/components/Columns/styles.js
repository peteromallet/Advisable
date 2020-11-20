import { space, variant } from "styled-system";
import styled, { css } from "styled-components";
import theme from "../../theme";

function halfRems(rems) {
  if (!rems) return 0;
  const units = parseFloat(rems) / 2;
  return `${units}rem`;
}

const alignment = variant({
  prop: "align",
  variants: {
    top: {
      alignItems: "flex-start",
    },
    center: {
      alignItems: "center",
    },
    bottom: {
      alignItems: "flex-end",
    },
  },
});

export const StyledColumns = styled.div`
  ${space}
  ${alignment}

  display: flex;
  flex-wrap: ${(p) => (p.wrap ? "wrap" : "nowrap")};
`;

const StyledColumn_Shrink = css`
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: 0%;
`;

const StyledColumn_Expanded = css`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
`;

const StyledColumn_Default = css`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
`;

export const StyledColumn = styled.div`
  padding-left: ${(p) => halfRems(theme.space[p.spacing]) || 0};
  padding-right: ${(p) => halfRems(theme.space[p.spacing]) || 0};

  ${(p) => (p.expand ? StyledColumn_Expanded : StyledColumn_Default)};
  ${(p) => p.shrink && StyledColumn_Shrink};

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }
`;
