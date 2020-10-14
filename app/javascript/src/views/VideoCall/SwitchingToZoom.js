import React from "react";
import Loading from "components/Loading";
import { useVideoCall } from "./queries";
import { Box, Text, Paragraph } from "@advisable/donut";

export default function SwitchingToZoom() {
  useVideoCall({ pollInterval: 1000 });

  return (
    <Box maxWidth="500px" mx="auto" py="4xl" textAlign="center">
      <Loading />
      <Text
        fontSize="4xl"
        marginBottom="md"
        color="neutral900"
        fontWeight="medium"
        letterSpacing="-0.01em"
      >
        Please wait while we setup a zoom meeting for this call...
      </Text>
      <Paragraph marginBottom="xl">This shouldn&apos;t take long...</Paragraph>
    </Box>
  );
}
