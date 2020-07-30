import React from "react";
import PropTypes from "prop-types";
import { Text, Box, Circle } from "@advisable/donut";
import { Check } from "@styled-icons/feather";
import MotionStack from "../MotionStack";

function Component({ title, text }) {
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

Component.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
};

function CallBooked() {
  return (
    <Component
      title="Your call is booked"
      text="We look forward to speaking!"
    />
  );
}

function CallShortly() {
  return (
    <Component
      title="Your call is booked"
      text="We look forward to speaking!"
    />
  );
}

function ReminderSet() {
  return (
    <Component
      title="Reminder Set"
      text="We'll send you a reminder in six months."
    />
  );
}

const ThankYou = (type) => {
  switch (type) {
    case "CallBooked":
      return CallBooked;
    case "CallShortly":
      return CallShortly;
    case "ReminderSet":
      return ReminderSet;
    default:
      return null;
  }
};

export default ThankYou;
