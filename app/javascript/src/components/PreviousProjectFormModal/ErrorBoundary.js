import React from "react";
import { Box, Icon, Text } from "@advisable/donut";

class PreviousProjectFormErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError)
      return (
        <Box
          py="xl"
          height="100%"
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
        >
          <Box maxWidth={400}>
            <Box
              width={50}
              height={50}
              bg="yellow.0"
              display="flex"
              margin="0 auto"
              borderRadius="50%"
              alignItems="center"
              justifyContent="center"
            >
              <Icon icon="alert-circle" color="yellow.6" />
            </Box>
            <Text
              color="blue900"
              textAlign="center"
              mb="xs"
              mt="m"
              fontWeight="medium"
            >
              Something went wrong...
            </Text>
            <Text
              fontSize="s"
              lineHeight="s"
              color="neutral700"
              textAlign="center"
            >
              An unexpected error has occured. We have been notified and are
              working to fix the problem.
            </Text>
          </Box>
        </Box>
      );

    return this.props.children;
  }
}

export default PreviousProjectFormErrorBoundary;
