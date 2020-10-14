import React from "react";
import { Box, Text, Link, Button } from "@advisable/donut";

export default function SwitchedToZoom({ data }) {
  const { zoomMeetingId, zoomPasscode, zoomUrl } = data.videoCall;

  return (
    <Box maxWidth="500px" mx="auto" py="4xl" textAlign="center">
      <Text
        fontSize="4xl"
        marginBottom="xl"
        color="neutral900"
        fontWeight="medium"
        letterSpacing="-0.01em"
      >
        This call has been moved to zoom.
      </Text>
      <Box marginBottom="xl">
        <Text marginBottom="xs">
          <Text as="span" fontWeight="medium" marginRight="xs">
            Meeting ID:
          </Text>
          {zoomMeetingId}
        </Text>
        <Text>
          <Text as="span" fontWeight="medium" marginRight="xs">
            Meeting Passcode:
          </Text>
          {zoomPasscode}
        </Text>
      </Box>
      <Link.External href={zoomUrl}>
        <Button>Join Zoom Call</Button>
      </Link.External>
    </Box>
  );
}
