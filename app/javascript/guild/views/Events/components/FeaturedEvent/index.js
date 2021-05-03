import React from "react";
import { Box, Text } from "@advisable/donut";
import { useHistory } from "react-router-dom";
import { CoverImage } from "@guild/components/CoverImage";
import StartsAtTag from "@guild/components/Event/StartsAtTag";
import HostDetails from "@guild/components/Event/HostDetails";
import AttendeesStack from "@guild/components/Event/AttendeesStack";
import { StyledLineClamp, StyledEventCard } from "@guild/views/Events/styles";
import OrbitsBackground from "@guild/components/Event/OrbitsBackground";
import Markdown from "@guild/components/Markdown";

export default function FeaturedEvent({ event }) {
  const attendees = event.attendees.edges.map((e) => e.node) || [];
  const history = useHistory();
  const eventLink = `/events/${event.id}`;

  const handleClick = (e) => {
    e.preventDefault();
    history.push(eventLink);
  };
  return (
    <StyledEventCard
      onClick={handleClick}
      padding="4"
      borderRadius="12px"
      marginBottom={10}
    >
      <Box display="flex" flexDirection={{ _: "column", m: "row" }}>
        <Box
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

        <Box marginLeft={{ _: 0, m: "8" }} paddingRight={2}>
          <Box marginTop={5}>
            <StartsAtTag
              variant={event.color}
              startsAt={event.startsAt}
              attending={event.attending}
            />
          </Box>
          <Box marginTop={4} marginBottom={2}>
            <StyledLineClamp
              size="4xl"
              lineHeight="1.1"
              fontWeight="600"
              color="neutral900"
              letterSpacing="-0.05rem"
              as={Text}
            >
              {event.title}
            </StyledLineClamp>
          </Box>
          <Box marginBottom={12}>
            <Markdown as={StyledLineClamp} height="72px" lines={3}>
              {event.description}
            </Markdown>
          </Box>
          <Box marginBottom={6}>
            <HostDetails variant={event.color} host={event.host} />
          </Box>
          <Box>
            {event.attendeesCount > 0 ? (
              <AttendeesStack
                attendees={attendees}
                attendeesCount={event.attendeesCount}
              />
            ) : null}
          </Box>
        </Box>
      </Box>
    </StyledEventCard>
  );
}
