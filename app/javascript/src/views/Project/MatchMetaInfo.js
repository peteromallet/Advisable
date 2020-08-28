import React from "react";
import { Box, Text } from "@advisable/donut";

export default function MatchMetaInfo({ match }) {
  return (
    <>
      <Text
        fontSize="22px"
        color="neutral900"
        marginBottom="4px"
        fontWeight="medium"
        letterSpacing="-0.03em"
      >
        {match.specialist.name}
      </Text>
      <Text
        fontSize="15px"
        fontWeight="light"
        color="neutral600"
        marginBottom="24px"
      >
        {match.specialist.location}
      </Text>
      <Box height="1px" bg="neutral200" />
      <Box paddingY="16px" display="flex" justifyContent="space-between">
        <Text fontSize="14px" color="neutral500">
          Hourly Rate
        </Text>
        <Text fontSize="14px" color="neutral900">
          ${match.rate}
        </Text>
      </Box>
      <Box height="1px" bg="neutral200" />
      <Box paddingY="16px" display="flex" justifyContent="space-between">
        <Text fontSize="14px" color="neutral500">
          Availability
        </Text>
        <Text fontSize="14px" color="neutral900">
          {match.availability}
        </Text>
      </Box>
    </>
  );
}
