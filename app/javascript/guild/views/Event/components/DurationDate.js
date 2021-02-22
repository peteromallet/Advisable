import React from "react";
import { Text, Box, theme } from "@advisable/donut";
import { DateTime } from "luxon";

export default function DurationDate({ startsAt, endsAt, ...props }) {
  const dts = DateTime.fromISO(startsAt);
  const dte = DateTime.fromISO(endsAt);

  const duration = `${dts.toFormat("h:mma")} - ${dte.toFormat(
    "h:mma",
  )}`.toLowerCase();

  return (
    <Box
      borderRadius="12px"
      border={`1px solid ${theme.colors.neutral900}`}
      padding="12px"
      display="flex"
      jutifyContent="center"
      flexDirection="column"
      {...props}
    >
      <Box mx="auto">
        <Text fontSize="l" fontWeight="semibold" color="neutral900">
          {duration} {dts.toFormat("ZZZZ")}
        </Text>
        <Text fontSize="m" color="neutral500">
          {dts.toFormat("d LLLL y")}
        </Text>
      </Box>
    </Box>
  );
}
