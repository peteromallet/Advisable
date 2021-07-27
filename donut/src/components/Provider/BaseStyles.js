import { createGlobalStyle } from "styled-components";
import { StyledDialogBackdrop, StyledDialog } from "../Modal";

const BACKGROUND = {
  default: "#F8F8F9",
  white: "#FFFFFF",
  ghostWhite: "#F9FAFF",
  beige: "#FBFAF9",
};

const BaseStyles = createGlobalStyle`
  :root {
    font-variation-settings: "ital" 0, "slnt" 0;
  }

  * {
    box-sizing: border-box;
  }

  html, body {
    font-size: 16px;
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  @font-face {
    font-family: "TTHoves";
    font-weight: 400;
    src: url('/fonts/TTHovesVariable/font.woff2') format('woff2 supports variations'),
      url('/fonts/TTHovesVariable/font.woff2') format('woff2-variations'),
      url("/fonts/TTHoves-Regular/font.woff2") format("woff2"),
      url("/fonts/TTHoves-Regular/font.woff") format("woff");
  }

  @font-face {
    font-family: "TTHoves";
    font-weight: 500;
    src: url('/fonts/TTHovesVariable/font.woff2') format('woff2 supports variations'),
      url('/fonts/TTHovesVariable/font.woff2') format('woff2-variations'),
      url("/fonts/TTHoves-Medium/font.woff2") format("woff2"),
      url("/fonts/TTHoves-Medium/font.woff") format("woff");
  }

  @supports (font-variation-settings: normal) {
    @font-face {
      font-family: 'TTHoves';
      src: url('/fonts/TTHovesVariable/font.woff2') format('woff2 supports variations'),
        url('/fonts/TTHovesVariable/font.woff2') format('woff2-variations');
      font-weight: 100 800;
    }

    .super-bold {
      font-weight: 1000;
    }
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
    font-family: TTHoves, sans-serif;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  html {
    min-height: 100%;
  }
  
  button {
    margin: 0;
  }

  body {
    width: 100vw;
    line-height: 1;
    min-height: 100%;
    overflow-x: hidden;
    background: ${(props) => BACKGROUND[props.theme.background]} !important;
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

  a {
    text-decoration: none;
  }

  body > .__reakit-portal {
    position: relative;
  }

  /* Styling for nested modals */
  ${StyledDialogBackdrop} {
    z-index: 20;
  }

  ${StyledDialog} {
    z-index: 25;
  }

  body > .__reakit-portal > .__reakit-portal {
    ${StyledDialogBackdrop} {
      z-index: 30;
      opacity: 0.25;
    }

    ${StyledDialog} {
      z-index: 35;
    }
  }
`;

export default BaseStyles;
