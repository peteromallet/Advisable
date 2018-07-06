import React from 'react';

class SimpleErrorBoundary extends React.Component {
  state = {
    hasError: false
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children
  }
}

export default SimpleErrorBoundary
