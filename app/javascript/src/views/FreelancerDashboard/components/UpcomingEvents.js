import React from "react";
import { Stack, Box, Text, Link } from "@advisable/donut";
import Event from "./Event";
import { ChevronRight } from "@styled-icons/heroicons-solid";
import SectionHeader from "./SectionHeader";

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
    <div>
      <Box
        display="flex"
        alignItems="baseline"
        marginBottom={3}
        justifyContent="space-between"
      >
        <SectionHeader>Upcoming events</SectionHeader>
        <Link to="/events" variant="subtle" fontWeight={450}>
          View all
          <ChevronRight size={16} />
        </Link>
      </Box>
      {events.length > 0 ? (
        <Stack spacing={6} divider="neutral100">
          {events}
        </Stack>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
