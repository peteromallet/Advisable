// This file defines the base styling for the application
import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  /* @import url('https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700'); */
  @import url("https://use.typekit.net/yuq4swo.css");

  * {
    box-sizing: border-box;
    /* -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale; */
    /* text-rendering: optimizeLegibility */
  }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    box-sizing: border-box;
    vertical-align: baseline;
    font-family: poppins, sans-serif;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  html {
    min-height: 100%;
  }

  body {
    width: 100vw;
    line-height: 1;
    min-height: 100%;
    overflow-x: hidden;
  }
  
  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  body {
    background-color: ${props => (props.lightBackground ? "#F6F8FF" : "#EFF2FD")};
  }

`;
