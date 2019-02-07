import * as React from "react";
import { Container, Inner } from "./styles";
import Text from "../../components/Text";
import Heading from "../../components/Heading";


class RootErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return {
      error: true
    };
  }

  componentDidCatch(error) {
    if (window.Rollbar) {
      Rollbar.error(error.message, error);
    }
  }

  render() {
    if (this.state.error)
      return (
        <Container>
          <Inner>
            <Heading size="l" marginBottom="s">Oops..</Heading>
            <Text>
              An unexpected error has occured. We have been notified and are
              working to fix the problem.
            </Text>
          </Inner>
        </Container>
      );
    return this.props.children;
  }
}

export default RootErrorBoundary;
