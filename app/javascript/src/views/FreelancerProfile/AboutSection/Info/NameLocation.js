import React from "react";
import { Box, Text } from "@advisable/donut";

function NameLocation({ specialist }) {
  return (
    <Box>
      <Text
        fontSize={{ _: "4xl", l: "5xl" }}
        fontWeight="medium"
        color="neutral900"
        mb="xxs"
      >
        {specialist.name}
      </Text>
      <Text color="neutral600" fontSize="l" mb="xs" lineHeight="140%">
        {specialist.location}
      </Text>
    </Box>
  );
}

export default NameLocation;
