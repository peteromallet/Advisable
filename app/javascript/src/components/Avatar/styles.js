import styled, { css } from "styled-components";

const sizes = {
  s: "30px",
  m: "50px",
  l: "80px",
};

const fontSizes = {
  s: "16px",
  m: "17px",
  l: "20px",
};

const shadow = css`
  box-shadow: 0px 2px 8px rgba(8, 22, 70, 0.16);
`;

export const Avatar = styled.div`
  width: ${props => sizes[props.size || "m"]};
  height: ${props => sizes[props.size || "m"]};
  color: ${props => (props.url ? "transparent" : "#0064FF")};
  font-size: ${props => fontSizes[props.size || "m"]};
  font-weight: 500;
  border-radius: 50%;
  text-align: center;
  align-items: center;
  display: inline-flex;
  background-size: cover;
  justify-content: center;
  background-position: center;
  background-color: rgba(0, 100, 255, 0.1);

  ${props => props.shadow && shadow};
`;
