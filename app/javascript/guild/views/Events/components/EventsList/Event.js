import React from "react";
import { useHistory } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Box, Text } from "@advisable/donut";
import { CoverImage } from "@guild/components/CoverImage";
import StartsAtTag from "@guild/components/Event/StartsAtTag";
import HostDetails from "@guild/components/Event/HostDetails";
import OrbitsBackground from "@guild/components/Event/OrbitsBackground";
import { StyledLineClamp, StyledEventCard } from "@guild/views/Events/styles";

export default function Event({ event }) {
  const history = useHistory();
  const eventLink = `/events/${event.id}`;

  const handleClick = (e) => {
    e.preventDefault();
    history.push(eventLink);
  };

  return (
    <StyledEventCard
      flex="auto"
      height="510px"
      minWidth="0"
      key={event.id}
      borderRadius="12px"
      position="relative"
      onClick={handleClick}
    >
      {event.coverPhotoUrl ? (
        <CoverImage
          maxWidth="100%"
          height="200px"
          borderRadius="12px 12px 0 0"
          cover={event.coverPhotoUrl}
        />
      ) : (
        <OrbitsBackground
          height="200px"
          color={event.color}
          borderRadius="12px 12px 0 0"
        />
      )}
      <Box padding="5">
        <StartsAtTag
          variant={event.color}
          startsAt={event.startsAt}
          attending={event.attending}
        />
        <StyledLineClamp
          fontSize="xl"
          lineHeight="1.1"
          fontWeight="550"
          color="neutral900"
          letterSpacing="-0.03rem"
          marginTop="4"
        >
          {event.title}
        </StyledLineClamp>
        <StyledLineClamp
          lines={3}
          marginTop="3"
          lineHeight="1.3"
          color="neutral700"
          height="64px"
          as={Text}
        >
          <ReactMarkdown>{event.description}</ReactMarkdown>
        </StyledLineClamp>

        <Box position="absolute" left={5} bottom="28px">
          <HostDetails variant={event.color} host={event.host} />
        </Box>
      </Box>
    </StyledEventCard>
  );
}
