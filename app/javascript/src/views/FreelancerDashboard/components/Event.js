import React from "react";
import { DateTime } from "luxon";
import css from "@styled-system/css";
import styled from "styled-components";
import { Box, Text, Link } from "@advisable/donut";
import Card from "./Card";
import { StyledLineClamp } from "@guild/views/Events/styles";
import OrbitsBackground from "@guild/components/Event/OrbitsBackground";
import { useImage } from "react-image";

const StartsAtTag = ({ startsAt }) => {
  const date = DateTime.fromISO(startsAt);
  return (
    <Box bg="white" zIndex="1" borderRadius="12px" width="44px">
      <Text
        fontSize="10px"
        paddingTop={0.5}
        fontWeight={550}
        lineHeight="14px"
        color="neutral900"
        textAlign="center"
        textTransform="uppercase"
      >
        {date.monthShort}
      </Text>
      <Box height="1px" width="100%" mb={0.5} bg="neutral100" />
      <Text
        fontSize="xl"
        lineHeight="s"
        fontWeight={550}
        textAlign="center"
        paddingBottom={1.5}
        color="neutral900"
      >
        {date.day}
      </Text>
    </Box>
  );
};

const StyledCoverImage = styled.img`
  object-fit: cover;
  pointer-events: none;
  width: 100%;
  height: 100%;
`;

const EventCoverImage = ({ coverPhotoUrl }) => {
  const { src } = useImage({ srcList: coverPhotoUrl });

  return <StyledCoverImage src={src} />;
};

export default function Event({ event }) {
  return (
    <Card as={Link} to={`/events/${event.id}`}>
      <Box display="flex" css={css({ columnGap: 4 })}>
        <Box
          display="flex"
          bg="neutral100"
          position="relative"
          justifyContent="center"
          alignItems="center"
          borderRadius="12px"
          minWidth="118px"
          width="118px"
          height="90px"
          css={`
            overflow: hidden;
          `}
        >
          <StartsAtTag startsAt={event.startsAt} />
          <Box position="absolute" left="0" top="0" right="0" bottom="0">
            {event.coverPhotoUrl ? (
              <EventCoverImage coverPhotoUrl={event.coverPhotoUrl} />
            ) : (
              <OrbitsBackground
                height="148px"
                color={event.color}
                borderRadius="12px 12px 0 0"
              />
            )}
          </Box>
        </Box>
        <Box>
          <StyledLineClamp
            lines={3}
            color="neutral900"
            lineHeight="s"
            fontWeight={450}
            mb={2}
          >
            {event.title}
          </StyledLineClamp>
          <Text
            fontSize="xs"
            color="neutral500"
            fontWeight={450}
            lineHeight="xs"
          >
            Hosted by <span>{event.host?.name}</span>
          </Text>
        </Box>
      </Box>
    </Card>
  );
}
