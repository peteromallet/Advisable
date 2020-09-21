import * as React from "react";
import * as Sentry from "@sentry/browser";
import { RefreshCw, AlertTriangle } from "@styled-icons/feather";
import { Circle, Box, Text, Button } from "@advisable/donut";
import CollectFeedback from "./CollectFeedback";

class RootErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      eventId: null,
      update: null,
    };
  }

  static getDerivedStateFromError() {
    return {
      error: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    if (error.name && error.name.match(/ChunkLoadError/)) {
      this.setState({ update: true });
      return;
    }

    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({ eventId });
    });
  }

  render() {
    if (this.state.update) {
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
            A new version of Advisable has been released since you last reloaded
            the page. You will need to reload the page to upgrade to the new
            version.
          </Text>
          <Button size="l" onClick={() => location.reload()}>
            Upgrade to new version
          </Button>
        </Box>
      );
    }

    if (this.state.error)
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
            An unexpected error has occurred. We have been notified and are
            working to fix the problem.
          </Text>
          <CollectFeedback eventId={this.state.eventId} />
        </Box>
      );
    return this.props.children;
  }
}

export default RootErrorBoundary;
