import React from "react";
import styled, { css } from "styled-components";
import { withSpacing } from "src/components/Spacing";
import { Link } from "react-router-dom";

const STYLES = {
  subtle: css`
    color: #4d5880;

    &:hover {
      color: #0064ff;
    }
  `,
};

let RouterLink = styled(Link)`
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

  ${props => STYLES[props.styling]}
`;

RouterLink = withSpacing(RouterLink);

export default props => <RouterLink as={props.href && "a"} {...props} />;
