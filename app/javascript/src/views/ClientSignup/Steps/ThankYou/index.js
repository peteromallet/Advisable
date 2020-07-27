import React from "react";
import PropTypes from "prop-types";
import { Text, Box } from "@advisable/donut";
import MotionStack from "../MotionStack";
import check from "./check.png";

function ThankYou({ title, text }) {
  return (
    <Box py="xxl">
      <MotionStack
        justifyContent="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box mb="m">
          <img src={check} width={55} alt="" />
        </Box>
        <Text
          as="h2"
          color="blue800"
          fontSize="xxl"
          fontWeight="semibold"
          letterSpacing="-0.02em"
          mb="xxs"
        >
          {title}
        </Text>
        <Text>{text}</Text>
      </MotionStack>
    </Box>
  );
}

ThankYou.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
};

export default ThankYou;
