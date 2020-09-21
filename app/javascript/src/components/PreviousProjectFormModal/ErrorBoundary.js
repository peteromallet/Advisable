import React from "react";
import { AlertCircle } from "@styled-icons/feather";
import { Box, Text } from "@advisable/donut";

class PreviousProjectFormErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };

  componentDidCatch() {
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
              bg="orange100"
              display="flex"
              margin="0 auto"
              borderRadius="50%"
              alignItems="center"
              color="orange700"
              justifyContent="center"
            >
              <AlertCircle size={24} strokeWidth={2} />
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
              An unexpected error has occurred. We have been notified and are
              working to fix the problem.
            </Text>
          </Box>
        </Box>
      );

    return this.props.children;
  }
}

export default PreviousProjectFormErrorBoundary;
