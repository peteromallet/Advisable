import React from "react";
import { Box, Text, Icon, Circle } from "@advisable/donut";

function HelperText({ heading, children, ...props }) {
  return (
    <Box {...props}>
      <Text color="blue900" mb="xxs" fontWeight="medium">
        {heading}
      </Text>
      <Text color="neutral800" mb="xs" fontSize="xs" lineHeight="s">
        {children}
      </Text>
    </Box>
  );
}

function Helper({ children }) {
  return (
    <Box bg="cyan100" borderRadius="20px" padding="m">
      <Circle size="40px" bg="cyan500" mb="m">
        <Icon icon="bell" color="white.9" />
      </Circle>
      {children}
    </Box>
  );
}

Helper.Text = HelperText;

export default Helper;
