import React from "react";
import { isSupported } from "twilio-video";
import { Box, Text, Paragraph } from "@advisable/donut";

export default function UnsupportedBrowser({ children }) {
  if (!isSupported) {
    return (
      <Box maxWidth="400px" marginX="auto" paddingY="4xl">
        <Text
          fontSize="3xl"
          color="neutral900"
          fontWeight="medium"
          marginBottom="xs"
        >
          Browser not supported
        </Text>
        <Paragraph>
          Unfortunately it looks like you are using a browser that doesn&apos;t
          support video calls. Please try with a different browser.
        </Paragraph>
      </Box>
    );
  }

  return children;
}
