import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Check } from "@styled-icons/heroicons-outline";
import { Card, Box, Stack, Tag } from "@advisable/donut";
import { CoverImage } from "@guild/components/CoverImage";
import StartsAtTag from "@guild/components/Event/StartsAtTag";
import HostDetails from "@guild/components/Event/HostDetails";
import OrbitsBackground from "@guild/components/Event/OrbitsBackground";
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
        <Box display="flex">
          <StartsAtTag variant={variant} startsAt={event.startsAt} />
          {event.attending ? (
            <Tag
              icon={Check}
              marginLeft="2"
              size={["s", "m"]}
              variant={variant}
              opacity="0.8"
            >
              Attending
            </Tag>
          ) : null}
        </Box>
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

            <StyledLineClamp
              marginTop="3"
              lines={3}
              color="#6F7386"
              lineHeight="l"
            >
              {event.excerpt}
            </StyledLineClamp>
          </Link>

          <HostDetails variant={variant} host={event.host} />
        </Stack>
      </Box>
    </Card>
  );
}
