import React from "react";
import { Box, Text, Button } from "@advisable/donut";
import useCallContext from "./useCallContext";

export default function VideoCallLeft() {
  const { connect, isConnecting } = useCallContext();

  return (
    <Box padding="4xl" textAlign="center">
      <Text
        fontSize="4xl"
        marginBottom="lg"
        color="neutral900"
        fontWeight="medium"
        letterSpacing="-0.02rem"
      >
        You left the video call
      </Text>
      <Button
        size="l"
        variant="subtle"
        onClick={connect}
        loading={isConnecting}
      >
        Rejoin
      </Button>
    </Box>
  );
}
