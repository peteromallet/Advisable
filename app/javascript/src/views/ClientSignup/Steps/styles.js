import React from "react";
import PropTypes from "prop-types";
import { Text } from "@advisable/donut";

export const Title = (props) => (
  <Text
    as="h2"
    color="blue800"
    fontSize={["xxl", "xxxl"]}
    lineHeight={["xxl", "xxxl"]}
    fontWeight="semibold"
    letterSpacing="-0.02em"
    mb="xxs"
    {...props}
  >
    {props.children}
  </Text>
);

Title.propTypes = {
  children: PropTypes.node,
};
