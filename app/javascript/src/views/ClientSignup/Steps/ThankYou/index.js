import React from "react";
import PropTypes from "prop-types";
import { Text, Box, Circle } from "@advisable/donut";
import { Check } from "@styled-icons/feather";
import MotionStack from "../MotionStack";

function ThankYou({ title, text }) {
  return (
    <Box py="xxl">
      <MotionStack
        justifyContent="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Circle bg="blue100" size={60} color="blue600" mb="m">
          <Check strokeWidth={3} size={24} />
        </Circle>
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
