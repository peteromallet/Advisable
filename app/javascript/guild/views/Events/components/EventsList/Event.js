import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, Box, Stack } from "@advisable/donut";
import { CoverImage } from "@guild/components/CoverImage";
import StartsAtTag from "@guild/components/Event/StartsAtTag";
import HostDetails from "@guild/components/Event/HostDetails";
import OrbitsBackground from "@guild/components/Event/OrbitsBackground";
import Markdown from "@guild/components/Markdown";
import { colorVariants } from "./Colors";
import { StyledLineClamp } from "@guild/views/Events/styles";

export default function Event({ event }) {
  const variant = useMemo(
    () => colorVariants[Math.floor(Math.random() * colorVariants.length)],
    [],
  );
  const eventLink = `/events/${event.id}`;

  return (
    <Card flex="auto" minHeight="520px" key={event.id} borderRadius="12px">
      <Link to={eventLink}>
        {event.coverPhotoUrl ? (
          <CoverImage
            height="200px"
            borderRadius="12px 12px 0 0"
            cover={event.coverPhotoUrl}
          />
        ) : (
          <OrbitsBackground
            height="200px"
            color={variant}
            borderRadius="12px 12px 0 0"
          />
        )}
      </Link>
      <Box padding="5">
        <StartsAtTag
          variant={variant}
          startsAt={event.startsAt}
          attending={event.attending}
        />
        <Stack spacing="4">
          <Link to={eventLink}>
            <StyledLineClamp
              fontSize="l"
              lineHeight="l"
              fontWeight="semibold"
              color="neutral900"
              marginTop="5"
            >
              {event.title}
            </StyledLineClamp>
            <Markdown
              lines={3}
              color="#6F7386"
              marginTop="3"
              lineHeight="l"
              as={StyledLineClamp}
            >
              {event.description}
            </Markdown>
          </Link>

          <HostDetails variant={variant} host={event.host} />
        </Stack>
      </Box>
    </Card>
  );
}
