import * as Sentry from "@sentry/react";
import { RefreshCw, AlertTriangle } from "@styled-icons/feather";
import { Circle, Box, Text, Button } from "@advisable/donut";
import CollectFeedback from "./CollectFeedback";

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
// To handle these we display a message saying a new update has been released
// and ask the user to upgrade by refreshing their browser, this will request
// the most recent assets.
//
// We should eventually use service workers to reduce this error, or maintain
// old versions for a certain amount of time
// https://stackoverflow.com/questions/44601121/code-splitting-causes-chunks-to-fail-to-load-after-new-deployment-for-spa
function UpdateAvailable() {
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
  // Catch chunk load errors
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
