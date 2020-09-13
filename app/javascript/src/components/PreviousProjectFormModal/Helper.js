import React from "react";
import { Bell } from "@styled-icons/feather";
import { Box, Text, Circle } from "@advisable/donut";

function HelperText({ heading, children, ...props }) {
  return (
    <Box {...props}>
      <Text color="blue900" mb="xs" fontSize="l" fontWeight="medium">
        {heading}
      </Text>
      <Text color="neutral800" mb="xs" fontSize="s" lineHeight="s">
        {children}
      </Text>
    </Box>
  );
}

function Helper({ children }) {
  return (
    <Box bg="cyan100" borderRadius="20px" padding="m">
      <Circle size="40px" bg="cyan500" mb="m" color="white">
        <Bell size={24} strokeWidth={2} />
      </Circle>
      {children}
    </Box>
  );
}

Helper.Text = HelperText;

export default Helper;
