import * as React from "react";
import * as Sentry from "@sentry/browser";
import { Circle, Box, Icon, Text } from "@advisable/donut";
import CollectFeedback from "./CollectFeedback";

class RootErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, eventId: null };
  }

  static getDerivedStateFromError(error) {
    return {
      error: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope(scope => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({ eventId });
    });

    if (window.Rollbar) {
      Rollbar.error(error.message, error);
    }
  }

  render() {
    if (this.state.error)
      return (
        <Box maxWidth={320} mx="auto" my="xxl" textAlign="center">
          <Circle bg="blue.1" mb="m">
            <Icon
              mt="-2px"
              width={30}
              height={30}
              color="blue.8"
              icon="alert-triangle"
            />
          </Circle>
          <Text
            mb="s"
            as="h1"
            fontSize={32}
            color="blue.9"
            fontWeight="bold"
            letterSpacing="-0.05em"
          >
            Oops..
          </Text>
          <Text fontSize="s" lineHeight="s" color="neutral.8" mb="l">
            An unexpected error has occured. We have been notified and are
            working to fix the problem.
          </Text>
          <CollectFeedback eventId={this.state.eventId} />
        </Box>
      );
    return this.props.children;
  }
}

export default RootErrorBoundary;
