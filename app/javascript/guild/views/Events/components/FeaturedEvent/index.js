import React from "react";
import { Card, Box, Stack } from "@advisable/donut";
import { Link } from "react-router-dom";
import { CoverImage } from "@guild/components/CoverImage";
import StartsAtTag from "@guild/components/Event/StartsAtTag";
import HostDetails from "@guild/components/Event/HostDetails";
import AttendeesStack from "@guild/components/Event/AttendeesStack";
import { StyledLineClamp } from "@guild/views/Events/styles";
import OrbitsBackground from "@guild/components/Event/OrbitsBackground";
import Markdown from "@guild/components/Markdown";

export default function FeaturedEvent({ event }) {
  const attendees = event.attendees.edges.map((e) => e.node) || [];
  const eventLink = `/events/${event.id}`;

  return (
    <Card padding="4" borderRadius="12px">
      <Box display="flex" flexDirection={{ _: "column", m: "row" }}>
        <Box
          as={Link}
          to={eventLink}
          minWidth={{ _: "100%", m: "33%", l: "417px" }}
          height="385px"
          display="flex"
        >
          {event.coverPhotoUrl ? (
            <CoverImage
              height="385px"
              borderRadius="8px"
              cover={event.coverPhotoUrl}
            />
          ) : (
            <OrbitsBackground borderRadius="12px" color={event.color} />
          )}
        </Box>

        <Box marginLeft={{ _: 0, m: "8" }}>
          <Box marginTop={{ _: "5", m: 0 }}>
            <StartsAtTag
              variant={event.color}
              startsAt={event.startsAt}
              attending={event.attending}
            />
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
            <Link to={eventLink}>
              <Markdown
                as={StyledLineClamp}
                size="l"
                lineHeight="l"
                color="neutral900"
                lines={3}
              >
                {event.description}
              </Markdown>
            </Link>
            <HostDetails variant={event.color} host={event.host} />
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
