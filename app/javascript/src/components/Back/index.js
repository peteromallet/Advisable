import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { withSpacing } from "src/components/Spacing";
import arrow from "./arrow.svg";

const Back = withSpacing(styled(Link)`
  color: #0064ff;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  position: relative;
  display: inline-block;
  text-decoration: none;
  text-transform: uppercase;

  &:hover {
    color: #0041a5;
  }
`);

const Arrow = styled.div`
  width: 5px;
  height: 10px;
  margin-right: 8px;
  display: inline-block;
  background-size: cover;
  background-image: url(${arrow});
`;

export default ({ children, ...props }) => (
  <Back {...props}>
    <Arrow />
    {children || "Back"}
  </Back>
);
