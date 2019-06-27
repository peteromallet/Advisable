import get from "lodash/get";
import styled from "styled-components";
import colors from "../../colors";
import responsiveProp from "../../utilities/responsiveProp";

const SIZES = {
  xxl: "1.75rem",
  xl: "1.5rem",
  l: "1.25rem",
  m: "1.1rem",
  s: "0.937rem",
  xs: "0.875rem",
  xxs: "0.75rem",
};

const WEIGHTS = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

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
  font-size: ${props => SIZES[responsiveProp(props, "size", "s")]};
  font-weight: ${props => WEIGHTS[responsiveProp(props, "weight", "regular")]};
  color: ${props => get(colors, responsiveProp(props, "color", "neutral.N9"))};
  line-height: ${props =>
    props.multiline ? LINE_HEIGHTS[props.size || "s"] : 1};
`;

export default Text;
