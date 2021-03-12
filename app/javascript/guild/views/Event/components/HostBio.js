import React from "react";
import { Box, Link, Text } from "@advisable/donut";
import HostAvatar from "@guild/components/Event/HostAvatar";
import { StyledLineClamp } from "@guild/views/Events/styles";

export default function HostBio({ host }) {
  return (
    <Box background="#F2EFFC" padding="4" borderRadius="12px">
      <HostAvatar mb="4" variant="purple" host={host} />
      <Box mb="3">
        <Text mb="1" fontSize="l" color="blue900">
          {host.name}
        </Text>
        <Text fontSize="m" color="neutral600" letterSpacing="-0.02rem">
          {host.location}
        </Text>
      </Box>

      <StyledLineClamp
        lines={7}
        lineHeight="s"
        fontSize="15px"
        letterSpacing="-0.01rem"
        color="neutral600"
        mb="6"
      >
        {host.bio}
      </StyledLineClamp>
      <Link fontSize="15px" lineHeight="s" to={`/freelancers/${host.id}`}>
        View Profile
      </Link>
    </Box>
  );
}
