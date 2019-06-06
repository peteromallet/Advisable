import { createGlobalStyle } from "styled-components";

const BaseStyles = createGlobalStyle`
  @import url("https://use.typekit.net/yuq4swo.css");

  html {
    font-size: 15px;
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
`;

export default BaseStyles;
