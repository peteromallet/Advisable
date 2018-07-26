import styled from "styled-components";
import { withSpacing } from "./Spacing";

const weights = {
  strong: 600,
  bold: 600
};

const colours = {
  strong: "#1B2A3A",
  dark: "#1B2A3A",
};

const sizes = {
  s: "14px",
  m: "16px",
  l: "18px"
};

const lineHeights = {
  m: "23px",
  l: "28px"
};

const kerning = {
  m: "-0.005em",
  l: "-0.02em"
};

const Text = styled.p`
  display: ${props => props.inline && 'inline'};
  font-size: ${props => sizes[props.size] || sizes["m"]};
  line-height: ${props => lineHeights[props.size] || lineHeights["m"]};
  font-weight: ${props => weights[props.weight || props.variation] || 400};
  color: ${props => colours[props.colour || props.variation] || "#4B5D78"};
  letter-spacing: ${props => kerning[props.size] || kerning["m"]};
`;

export default withSpacing(Text);
