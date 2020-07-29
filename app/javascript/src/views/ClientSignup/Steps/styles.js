import React from "react";
import PropTypes from "prop-types";
import { Text } from "@advisable/donut";

export const Title = ({ children, ...props }) => (
  <Text
    as="h2"
    color="blue900"
    fontSize={["xxl", "xxxl"]}
    lineHeight={["xxl", "xxxl"]}
    fontWeight="semibold"
    letterSpacing="-0.02em"
    mb="xs"
    {...props}
  >
    {children}
  </Text>
);

Title.propTypes = { children: PropTypes.node };

export const Description = ({ children, ...props }) => (
  <Text mb="l" lineHeight="21px" color="neutral800" {...props}>
    {children}
  </Text>
);

Description.propTypes = { children: PropTypes.node };
