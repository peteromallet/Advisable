import styled from "styled-components";
import { padding } from "styled-system";

const weights = {
  strong: 600,
  bold: 600,
  semibold: 500,
};

const colours = {
  strong: "#1B2A3A",
  dark: "#00114D",
  white: "white",
  subtleWhite: "rgba(255, 255, 255, 0.8)",
};

const sizes = {
  xs: "13px",
  s: "14px",
  m: "15px",
  l: "16px",
};

const lineHeights = {
  xs: "19px",
  s: "19px",
  m: "20px",
  l: "22px",
};

export const Text = styled.p`
  ${padding};

  display: ${(props) => props.inline && "inline"};
  font-size: ${(props) => sizes[props.size] || sizes["m"]};
  line-height: ${(props) => lineHeights[props.size] || lineHeights["m"]};
  font-weight: ${(props) => weights[props.weight || props.variation] || 400};
  color: ${(props) => colours[props.colour || props.variation] || "#353E5C"};
  text-align: ${(props) => (props.center ? "center" : "inherit")};

  a {
    color: #1232a6;
    text-decoration: none;

    &:hover {
      color: #2555ff;
    }
  }
`;

export default Text;
