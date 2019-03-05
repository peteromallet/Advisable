import styled, { css } from "styled-components";
import { withSpacing } from "./Spacing";

const sizes = {
  xxs: "13px",
  s: "18px",
  m: "20px",
  l: "28px"
};

const textTransform = {
  xxs: "uppercase"
};

const lineHeighs = {
  s: "24px",
  m: "22px",
  l: "34px"
};

const weights = {
  s: 500,
  m: 600,
  l: "bold",
  semibold: 600,
  xxs: 500
};

const colours = {
  default: "#1E1A48"
};

const letterSpacing = {
  m: "-0.015em",
  l: "-0.025em",
  xxs: ""
};

const levels = {
  1: css`
    color: #0A1745;
    font-size: 30px;
    font-weight: 600;
    line-height: 32px;
    letter-spacing: -0.03em;
  `,
  2: css`
    color: #0A1745;
    font-size: 24px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: -0.02em;
  `,
  4: css`
    color: #0a1745;
    font-size: 18px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0;
  `,
  5: css`
    color: #0a1745;
    font-size: 17px;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: 0;
  `,
  6: css`
    color: #757fa4;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0;
    text-transform: uppercase;
  `
};

const ELEMENTS = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
}

export default withSpacing(styled.h3.attrs(props => ({
  as: props.as || ELEMENTS[props.level]
}))`
  color: ${props => colours["default"]};
  font-size: ${props => sizes[props.size] || sizes["m"]};
  font-weight: ${props => weights[props.weight || props.size] || weights["m"]};
  line-height: ${props => lineHeighs[props.size] || lineHeighs["m"]};
  letter-spacing: ${props => letterSpacing[props.size] || letterSpacing["m"]};
  display: ${props => (props.block ? "block" : "auto")};
  text-align: ${props => (props.center ? "center" : "inherit")};
  text-transform: ${props => textTransform[props.size]};

  ${props => levels[props.level]};
`);
