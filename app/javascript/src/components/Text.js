import styled from "styled-components";
import { withSpacing } from "./Spacing";

const weights = {
  strong: 600,
  bold: 600,
  semibold: 500,
};

const colours = {
  strong: "#1B2A3A",
  dark: "#00114D",
};

const sizes = {
  xs: "14px",
  s: "15px",
  m: "16px",
  l: "17px"
};

const lineHeights = {
  xs: "19px",
  s: '20px',
  m: "20px",
  l: "22px"
};

const Text = styled.p`
  font-family: system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif;

  display: ${props => props.inline && 'inline'};
  font-size: ${props => sizes[props.size] || sizes["m"]};
  line-height: ${props => lineHeights[props.size] || lineHeights["m"]};
  font-weight: ${props => weights[props.weight || props.variation] || 400};
  color: ${props => colours[props.colour || props.variation] || "#353E5C"};
  text-align: ${props => props.center ? 'center' : 'inherit'};
`;

export default withSpacing(Text);
