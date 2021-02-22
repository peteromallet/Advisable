import React from "react";
import { Box, Text } from "@advisable/donut";
import HostAvatar from "./HostAvatar";

export default function HostDetails({ host, variant = "orange" }) {
  return (
    <Box display="flex" alignItems="center">
      <HostAvatar host={host} variant={variant} />
      <Box marginLeft="3">
        <Text color="neutral900" fontSize="l">
          {host.name}
        </Text>
        <Text
          letterSpacing="-0.02em"
          marginTop="1"
          mcolor="neutral700"
          fontSize="xs"
        >
          {host.location}
        </Text>
      </Box>
    </Box>
  );
}
