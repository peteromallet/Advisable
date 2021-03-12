import React from "react";
import { Card, Text, Box, Stack } from "@advisable/donut";
import { Link } from "react-router-dom";
import { truncate } from "lodash-es";
import { CoverImage } from "@guild/components/CoverImage";
import StartsAtTag from "@guild/components/Event/StartsAtTag";
import HostDetails from "@guild/components/Event/HostDetails";
import AttendeesStack from "@guild/components/Event/AttendeesStack";
import { StyledLineClamp } from "@guild/views/Events/styles";
import OrbitsBackground from "@guild/components/Event/OrbitsBackground";

export default function TopEvent({ event }) {
  const attendees = event.attendees.edges.map((e) => e.node) || [];
  const eventLink = `/events/${event.id}`;

  return (
    <Card padding="4" borderRadius="12px">
      <Box display="flex" flexDirection={{ _: "column", m: "row" }}>
        {event.coverPhotoUrl ? (
          <Box
            as={Link}
            to={eventLink}
            minWidth={{ _: "100%", m: "33%", l: "417px" }}
            display="flex"
          >
            <CoverImage
              height="385px"
              borderRadius="8px"
              cover={event.coverPhotoUrl}
            />
          </Box>
        ) : (
          <OrbitsBackground borderRadius="12px" height="385px" orbits={6} />
        )}
        <Box marginLeft={{ _: 0, m: "8" }}>
          <Box marginTop={{ _: "5", m: 0 }}>
            <StartsAtTag event={event} />
          </Box>
          <Box marginTop="5">
            <Link to={eventLink}>
              <StyledLineClamp
                size="4xl"
                color="blue900"
                lineHeight="3xl"
                fontWeight="semibold"
              >
                {event.title}
              </StyledLineClamp>
            </Link>
          </Box>
          <Stack marginTop="3" spacing="8">
            <Text
              as={Link}
              to={eventLink}
              size="l"
              lineHeight="l"
              color="neutral900"
            >
              {truncate(event.excerpt, { length: 180 })}
            </Text>
            <HostDetails host={event.host} />
            {event.attendeesCount > 0 ? (
              <AttendeesStack
                attendees={attendees}
                attendeesCount={event.attendeesCount}
              />
            ) : null}
          </Stack>
        </Box>
      </Box>
    </Card>
  );
}
