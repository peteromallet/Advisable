import React from 'react';
import NotFound from './index';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    if (error.name === "NotFoundError") {
      return {
        hasError: true,
        message: error.message
      };
    }
  }

  render() {
    if (this.state.hasError) {
      return <NotFound>{this.state.message}</ NotFound>
    }

    return this.props.children; 
  }
}

export default ErrorBoundary