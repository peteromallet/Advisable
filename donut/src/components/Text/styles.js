import styled from "styled-components";
import { space, color, typography } from "styled-system";

const LINE_HEIGHTS = {
  xxl: "2rem",
  xl: "1.75rem",
  l: "1.7rem",
  m: "1.5rem",
  s: "1.4rem",
  xs: "1.3rem",
  xxs: "1.2rem",
};

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
