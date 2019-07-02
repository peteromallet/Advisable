import styled from "styled-components";
import { space, color, typography } from "styled-system";

export const Text = styled.div`
  ${space}
  ${color}
  ${typography}
`;

Text.defaultProps = {
  color: "neutral.9",
  fontSize: "m",
  lineHeight: 1,
};

export default Text;
