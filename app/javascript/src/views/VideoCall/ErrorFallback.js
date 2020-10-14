import React from "react";
import { Box, Text, Paragraph } from "@advisable/donut";
import SwitchToZoom from "./SwitchToZoom";

export default function ErrorFallback() {
  return (
    <Box maxWidth="500px" mx="auto" py="4xl" textAlign="center">
      <Text
        fontSize="5xl"
        marginBottom="md"
        color="neutral900"
        fontWeight="medium"
        letterSpacing="-0.01em"
      >
        Oops...
      </Text>
      <Text
        fontSize="3xl"
        marginBottom="md"
        color="neutral900"
        fontWeight="medium"
        letterSpacing="-0.01em"
      >
        It looks like something went wrong
      </Text>
      <Paragraph marginBottom="xl">
        It looks like an error has occurred. We have been notified and are
        working to fix the problem. In the meantime please click the button
        below to switch from Advisable calls to Zoom.
      </Paragraph>
      <SwitchToZoom />
    </Box>
  );
}
