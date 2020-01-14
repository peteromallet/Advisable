import { createGlobalStyle } from "styled-components";

const BACKGROUND = {
  default: "#F4F6FD",
  white: "#FFFFFF",
};

const BaseStyles = createGlobalStyle`
  html, body {
    font-size: 16px;
    box-sizing: border-box;
    font-family: poppins, sans-serif;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body, h1, h2, h3, h4, h5, h6, p, ol, ul {
    margin: 0;
    padding: 0;
    font-weight: normal;
  }

  body {
    background: ${props => BACKGROUND[props.theme.background]} !important;
    transition: background-color 400ms;
  }
`;

export default BaseStyles;
