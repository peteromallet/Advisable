import React, { useEffect } from "react";
import * as Sentry from "@sentry/react";
import { AlertTriangle } from "@styled-icons/feather/AlertTriangle";
import { RefreshCw } from "@styled-icons/feather/RefreshCw";
import { Circle, Box, Text, Button } from "@advisable/donut";
import CollectFeedback from "./CollectFeedback";

const CHUNK_LOAD_EXPIRY = 60000; // 1 min

function markChunkLoadErrorTime() {
  localStorage.setItem(
    "chunkLoadError",
    new Date().getTime() + CHUNK_LOAD_EXPIRY,
  );
}

function handleChunkLoadWithrefresh() {
  const timestamp = window.localStorage.getItem("chunkLoadError");
  if (!timestamp) return true;
  const isExpired = new Date().getTime() > timestamp;
  return isExpired;
}

function ErrorMessage({ eventId }) {
  return (
    <Box maxWidth={320} mx="auto" my="xxl" textAlign="center">
      <Circle bg="blue100" mb="m" color="blue800">
        <AlertTriangle size={30} strokeWidth={2} />
      </Circle>
      <Text
        mb="s"
        as="h1"
        fontSize={32}
        color="blue900"
        fontWeight="bold"
        letterSpacing="-0.05em"
      >
        Oops..
      </Text>
      <Text fontSize="s" lineHeight="s" color="neutral800" mb="l">
        An unexpected error has occurred. We have been notified and are working
        to fix the problem.
      </Text>
      <CollectFeedback eventId={eventId} />
    </Box>
  );
}

// When a user visits a url on the app, their browser downloads the assets for
// the page they are viewing. When they then click a link to go to another
// page their browser will request the assets for those pages. These assets
// are fingerprinted based on the contents of the file. In the even that a
// deployment is made while a user is on the site, by the time that they try
// to navigate to a new flow, the new deployment may have changed the names
// of these assets which results in a failed to load chunk error.
// To handle these errors we attempt to refresh the page for the user and to
// update them to the new version of the app. We store a timestamp when we
// attempt to refresh the page to prevent any chance of putting the user into
// a refresh loop in the event that the error is due to something else. As a
// fallback we display a message saying a new update has been released
// and ask the user to upgrade by refreshing their browser, this will request
// the most recent assets.
function UpdateAvailable() {
  const shouldHandleRedirect = handleChunkLoadWithrefresh();

  // Catch chunk load errors
  useEffect(() => {
    if (shouldHandleRedirect) {
      markChunkLoadErrorTime();
      window.location.reload();
    }
  }, [shouldHandleRedirect]);

  if (shouldHandleRedirect) return null;

  return (
    <Box maxWidth={340} mx="auto" my="xxl" textAlign="center">
      <Circle bg="blue800" mb="m" color="white">
        <RefreshCw size={24} strokeWidth={2} />
      </Circle>
      <Text
        mb="xs"
        as="h1"
        fontSize="xxl"
        color="blue900"
        fontWeight="semibold"
        letterSpacing="-0.05em"
      >
        Update Available
      </Text>
      <Text fontSize="s" lineHeight="s" color="neutral900" mb="l">
        A new version of Advisable has been released since you last reloaded the
        page. You will need to reload the page to upgrade to the new version.
      </Text>
      <Button size="l" onClick={() => location.reload()}>
        Upgrade to new version
      </Button>
    </Box>
  );
}

function RootErrorBoundaryFallback({ error, ...props }) {
  const updateAvailable = error.name && error.name.match(/ChunkLoadError/);
  if (updateAvailable) return <UpdateAvailable />;

  return <ErrorMessage {...props} />;
}

export default function RootErrorBoundary({ children }) {
  return (
    <Sentry.ErrorBoundary fallback={RootErrorBoundaryFallback}>
      {children}
    </Sentry.ErrorBoundary>
  );
}
