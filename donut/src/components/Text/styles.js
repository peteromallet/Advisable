import styled from "styled-components";
import { space, color, typography, system } from "styled-system";
import theme from "../../theme";

const textTransform = system({
  textTransform: true,
});

export const Text = styled.div`
  ${space};
  ${color};
  ${typography};
  ${textTransform};

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
  fontSize: "md",
};

export default Text;
