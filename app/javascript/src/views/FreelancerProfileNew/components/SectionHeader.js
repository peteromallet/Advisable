import React from "react";
import { Box, Text } from "@advisable/donut";

export function SectionHeaderWrapper({ children, ...props }) {
  return (
    <Box display="flex" alignItems="center" mb="xxs" px="xs" {...props}>
      {children}
    </Box>
  );
}

export function SectionHeaderText({ children, ...props }) {
  return (
    <Text
      as="h2"
      fontSize="xl"
      fontWeight="medium"
      lineHeight="29px"
      color="neutral600"
      {...props}
    >
      {children}
    </Text>
  );
}
