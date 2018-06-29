import React from "react";
import styled from "styled-components";
import Sidebar from "src/components/Sidebar";
import MobileHeader from "src/components/MobileHeader";
import MobileDrawer from "src/components/MobileDrawer";
import { Container, View } from './styles'

class ApplicationContainer extends React.Component {
  state = {
    drawer: false
  };

  toggleDrawer = () => {
    this.setState({ drawer: !this.state.drawer });
  };

  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    return (
      <Container>
        <Sidebar />
        <MobileDrawer
          open={this.state.drawer}
          toggleDrawer={this.toggleDrawer}
        />
        <MobileHeader
          drawerOpen={this.state.drawer}
          onOpenNavigation={this.toggleDrawer}
        />
        <View id="view" drawerOpen={this.state.drawer}>
          {this.props.children}
        </View>
      </Container>
    );
  }
}

export default ApplicationContainer;
