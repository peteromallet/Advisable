import React from "react";
import { Box, Text } from "@advisable/donut";

function NameLocation({ specialist }) {
  return (
    <Box>
      <Text
        fontSize="4xl"
        fontWeight="medium"
        letterSpacing="-0.03rem"
        color="neutral900"
        mb={0.5}
      >
        {specialist.name}
      </Text>
      <Text color="neutral600" fontSize="l" mb="xs" lineHeight="1.4">
        {specialist.location}
      </Text>
    </Box>
  );
}

export default NameLocation;
