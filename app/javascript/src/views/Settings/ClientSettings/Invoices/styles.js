import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { variant } from "styled-system";

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const StyledBadge = styled.div`
  padding: 0 12px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 24px;
  font-weight: 500;
  ${variant({
    variants: {
      open: { bg: "yellow100", color: "yellow800" },
      due: { bg: "neutral50", color: "neutral500" },
      paid: { bg: "cyan100", color: "cyan800" },
    },
  })};
`;

StyledBadge.defaultProps = {
  variant: "open",
};
export const Badge = ({ children, ...props }) => (
  <StyledBadge {...props}>{capitalize(children)}</StyledBadge>
);

Badge.propTypes = {
  children: PropTypes.node,
};
