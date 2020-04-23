import { space, variant } from "styled-system";
import styled, { css } from "styled-components";
import theme from "../../theme";

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
  padding-left: ${(p) => theme.space[p.spacing] / 2}px;
  padding-right: ${(p) => theme.space[p.spacing] / 2}px;

  ${(p) => (p.expand ? StyledColumn_Expanded : StyledColumn_Default)};

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }
`;
