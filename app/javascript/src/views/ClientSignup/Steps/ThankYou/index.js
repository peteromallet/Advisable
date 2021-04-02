import React from "react";
import { Box, Text, Circle, useBreakpoint } from "@advisable/donut";
import { Check } from "@styled-icons/feather/Check";

function Component({ title, text }) {
  const isDesktop = useBreakpoint("lUp");
  return (
    <Box
      position="absolute"
      width="256px"
      textAlign="center"
      pb="15%"
      left={isDesktop ? "40%" : "0"}
      top="0"
      right="0"
      bottom="0"
      m="auto"
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
      <Text lineHeight="21px">{text}</Text>
    </Box>
  );
}

export const CallBooked = () => (
  <Component title="Your call is booked" text="We look forward to speaking!" />
);

export const CallShortly = () => (
  <Component title="Your call is booked" text="We look forward to speaking!" />
);

export const ReminderSet = () => (
  <Component
    title="Reminder Set"
    text="We'll send you a reminder in six months."
  />
);
