import React from "react";
import { padding } from "styled-system";
import styled, { css } from "styled-components";
import { Link as ReactRouterLink } from "react-router-dom";

const STYLES = {
  subtle: css`
    color: #4d5880;

    &:hover {
      color: #0064ff;
    }
  `,
};

let RouterLink = styled(ReactRouterLink)`
  ${padding};

  color: #0064ff;
  align-items: center;
  display: inline-flex;
  text-decoration: none;

  img {
    vertical-align: middle;
    margin-right: 10px;
  }

  &:hover {
    color: #003890;
  }

  ${(props) => STYLES[props.styling]}
`;

export default function Link(props) {
  return <RouterLink as={props.href && "a"} {...props} />;
}
