import styled from "styled-components";
import { space, color, typography } from "styled-system";
import theme from "../../theme";

export const Text = styled.div`
  ${space}
  ${color}
  ${typography}

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
`;

Text.defaultProps = {
  color: "neutral.9",
  fontSize: "m",
};

export default Text;
