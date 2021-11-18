import React from "react";
import { Box, Link, Text } from "@advisable/donut";
import HostAvatar from "@guild/components/Event/HostAvatar";
import { StyledLineClamp } from "@guild/views/Events/styles";

export default function HostBio({ color, host }) {
  return (
    <Box background="#F2EFFC" padding="4" borderRadius="12px">
      <HostAvatar mb="6" variant={color} host={host} />
      <Box mb="3">
        <Text
          mb={0.5}
          fontSize="l"
          color="neutral900"
          fontWeight="500"
          letterSpacing="-0.02rem"
        >
          {host.name}
        </Text>
        <Text fontSize="m" color="neutral700" letterSpacing="-0.02rem">
          {host.location}
        </Text>
      </Box>

      <StyledLineClamp
        lines={7}
        lineHeight="s"
        fontSize="15px"
        letterSpacing="-0.01rem"
        color="neutral700"
        mb="6"
      >
        {host.bio}
      </StyledLineClamp>
      <Link fontSize="15px" lineHeight="s" to={`/profile/${host.id}`}>
        View Profile
      </Link>
    </Box>
  );
}
