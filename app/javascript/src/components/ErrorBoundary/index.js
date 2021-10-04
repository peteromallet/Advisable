import React from "react";
import * as Sentry from "@sentry/react";
import { Box, Text } from "@advisable/donut";
import CollectFeedback from "./CollectFeedback";
import DisconnectIllustration from "src/illustrations/zest/disconnect";

export function PageError({ eventId }) {
  return (
    <Box
      paddingY={4}
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="calc(100vh - 120px)"
    >
      <Box maxWidth="400px" textAlign="center">
        <DisconnectIllustration width="240px" />
        <Text
          mb="s"
          as="h1"
          fontSize="6xl"
          color="neutral900"
          fontWeight={700}
          letterSpacing="-0.05em"
        >
          Oops..
        </Text>
        <Text lineHeight="20px" color="neutral900" mb={8}>
          An unexpected error has occurred. We have been notified and are
          working to fix the problem.
        </Text>
        {eventId ? <CollectFeedback eventId={eventId} /> : null}
      </Box>
    </Box>
  );
}

export default function ErrorBoundary({ children }) {
  return (
    <Sentry.ErrorBoundary fallback={PageError}>{children}</Sentry.ErrorBoundary>
  );
}
