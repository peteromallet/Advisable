import React from "react";
import { Stack, Box, Text } from "@advisable/donut";
import Event from "./Event";

function EmptyState() {
  return (
    <Box
      width="100%"
      bg="neutral50"
      display="flex"
      border="2px solid"
      borderColor="neutral100"
      alignItems="center"
      justifyContent="center"
      borderRadius="20px"
      paddingY={10}
    >
      <Text color="neutral500" fontWeight={350}>
        There are no upcoming Events
      </Text>
    </Box>
  );
}

export default function UpcomingEvents({ upcomingEvents }) {
  const events = upcomingEvents.map((e) => <Event key={e.id} event={e} />);

  return (
    <>
      <Text
        color="neutral900"
        fontSize="2xl"
        lineHeight="36px"
        fontWeight={450}
        mb={3}
      >
        Upcoming events
      </Text>
      {events.length > 0 ? (
        <Stack spacing={6} divider="neutral100">
          {events}
        </Stack>
      ) : (
        <EmptyState />
      )}
    </>
  );
}
