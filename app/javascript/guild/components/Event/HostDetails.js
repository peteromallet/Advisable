import React from "react";
import { Box, Text } from "@advisable/donut";
import HostAvatar from "./HostAvatar";

export default function HostDetails({ host, variant = "orange" }) {
  return (
    <Box display="flex" alignItems="center">
      <HostAvatar host={host} variant={variant} />
      <Box marginLeft="3">
        <Text
          fontSize="l"
          fontWeight="500"
          marginBottom={1}
          color="neutral900"
          letterSpacing="-0.01rem"
        >
          {host.name}
        </Text>
        <Text fontSize="xs" color="neutral600">
          {host.location}
        </Text>
      </Box>
    </Box>
  );
}
