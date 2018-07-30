import React from "react";
import styled from "styled-components";
import { withSpacing } from "src/components/Spacing";
import { Link } from "react-router-dom";

let RouterLink = styled(Link)`
  color: #0064ff;
  display: flex;
  align-items: center;
  text-decoration: none;

  img {
    vertical-align: middle;
    margin-right: 10px;
  }

  &:hover {
    color: #003890;
  }
`;

RouterLink = withSpacing(RouterLink);

const ExternalLink = RouterLink.withComponent("a");

export default props =>
  props.href ? <ExternalLink {...props} /> : <RouterLink {...props} />;
