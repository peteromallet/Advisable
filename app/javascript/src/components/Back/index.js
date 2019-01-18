import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { withSpacing, extractSpacingProps } from "src/components/Spacing";

let Back = styled.a.attrs(props => ({
  as: props.to ? Link : "a"
}))`
  fill: #5c6782;
  color: #5c6782;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  position: relative;
  align-items: center;
  display: inline-flex;
  text-decoration: none;

  svg {
    margin-right: 10px;
  }

  span {
    transform: translateY(1px);
  }

  &:hover {
    fill: #0064ff;
    color: #0064ff;
  }
`;

Back = withSpacing(Back);

export default ({ children, ...props }) => {
  return (
    <Back {...props}>
      <svg width={17} height={15}>
        <path d="M4.828 9l4.086 4.086A1 1 0 0 1 7.5 14.5L.793 7.793 7.5 1.086A1 1 0 1 1 8.914 2.5L4.414 7H16a1 1 0 0 1 0 2H4.828z" />
      </svg>
      <span>{children || "Back"}</span>
    </Back>
  );
};
