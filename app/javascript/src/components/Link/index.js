import React from "react";
import styled, { css } from "styled-components";
import { withSpacing } from "src/components/Spacing";
import { Link } from "react-router-dom";

const STYLES = {
  subtle: css`
    color: #4D5880;

    &:hover {
      color: #0064ff;
    }
  `
}

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

const ExternalLink = RouterLink.withComponent("a");

export default props =>
  props.href ? <ExternalLink {...props} /> : <RouterLink {...props} />;
