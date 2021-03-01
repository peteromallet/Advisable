import styled, { css } from "styled-components";
import { display, space, color, typography, system } from "styled-system";
import theme from "../../theme";

const textTransform = system({
  textTransform: true,
});

const TextTruncated = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Text = styled.div`
  ${space};
  ${color};
  ${display};
  ${typography};
  ${textTransform};

  b {
    font-weight: 500;
  }

  .linkified {
    color: ${theme.colors.blue700};
    text-decoration: none;

    &:hover {
      color: ${theme.colors.blue500};
    }

    &:active {
      color: ${theme.colors.blue800};
    }
  }

  ${(p) => p.$truncate && TextTruncated};
`;

Text.defaultProps = {};

export default Text;
