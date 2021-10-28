import React from "react";
import { Box, Text } from "@advisable/donut";
import Page from "src/components/Page";
import Loading from "src/components/Loading";
import { useDashboardData } from "./queries";
import { DateTime } from "luxon";

function Event({ event }) {
  const date = DateTime.fromISO(event.startsAt);

  return (
    <Box mb={4} display="flex">
      <Box
        display="flex"
        position="relative"
        justifyContent="center"
        alignItems="center"
        borderRadius="12px"
        width="118px"
        height="90px"
        css={`
          overflow: hidden;
        `}
      >
        <Box bg="white" zIndex="1" borderRadius="12px" width="44px">
          <Text
            textAlign="center"
            fontSize="10px"
            lineHeight="16px"
            fontWeight={550}
            textTransform="uppercase"
            color="neutral900"
          >
            {date.monthShort}
          </Text>
          <Box height="1px" width="100%" pb="1px" bg="neutral100" />
          <Text
            textAlign="center"
            lineHeight="l"
            fontSize="xl"
            pb={0.5}
            fontWeight={550}
          >
            {date.day}
          </Text>
        </Box>
        <Box position="absolute" left="0" top="0" right="0" bottom="0">
          <img src={event.coverPhotoUrl} />
        </Box>
      </Box>
      <Box>
        <Text>{event.title}</Text>
        <Text>
          Hosted by <span>{event.host?.name}</span>
        </Text>
      </Box>
    </Box>
  );
}

export default function FreelancerDashboard() {
  const { data, loading, error } = useDashboardData();

  if (loading) return <Loading />;

  const events = data.upcomingEvents.map((e) => <Event key={e.id} event={e} />);

  return (
    <Page width="1080px">
      <Box paddingY={{ _: 8, m: 12 }} paddingX={{ _: 4, m: 8 }}>
        <Box>
          <Text mb={4}>Upcoming events</Text>
          <Box>{events}</Box>
        </Box>
      </Box>
    </Page>
  );
}
