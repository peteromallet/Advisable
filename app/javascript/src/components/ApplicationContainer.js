import React from 'react';
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

class ApplicationContainer extends React.Component {
  componentDidCatch(error, info) {
    console.log(error)
  }

  render() {
    return(
      <Container>
        {this.props.children}
      </Container>
    )
  }
}

export default ApplicationContainer
