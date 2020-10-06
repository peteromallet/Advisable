import React from "react";
import { Box, Text } from "@advisable/donut";

function SectionHeader({ children, actionButton }) {
  return (
    <Box display="flex" alignItems="center" mb="xxs" px="xs">
      <Text
        as="h2"
        fontSize="xl"
        fontWeight="medium"
        lineHeight="29px"
        color="neutral600"
      >
        {children}
      </Text>
      {actionButton && actionButton}
    </Box>
  );
}

export default SectionHeader;
