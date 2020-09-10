import React from "react";
import { Box, Text } from "@advisable/donut";

export default function MatchMetaInfo({ match }) {
  return (
    <>
      <Text
        fontSize="3xl"
        color="neutral900"
        marginBottom="4px"
        fontWeight="medium"
        letterSpacing="-0.02em"
      >
        {match.specialist.name}
      </Text>
      <Text
        fontSize="sm"
        fontWeight="light"
        color="neutral600"
        marginBottom="24px"
      >
        {match.specialist.location}
      </Text>
      <Box height="1px" bg="neutral200" />
      <Box paddingY="16px" display="flex" justifyContent="space-between">
        <Text fontSize="sm" color="neutral700">
          Hourly Rate
        </Text>
        <Text fontSize="sm" fontWeight="medium" color="neutral900">
          ${match.rate}
        </Text>
      </Box>
      <Box height="1px" bg="neutral200" />
      <Box paddingY="16px" display="flex" justifyContent="space-between">
        <Text fontSize="sm" color="neutral700">
          Available to start
        </Text>
        <Text fontSize="sm" fontWeight="medium" color="neutral900">
          {match.availability}
        </Text>
      </Box>
    </>
  );
}
