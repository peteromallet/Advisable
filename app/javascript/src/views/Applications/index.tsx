// Renders the freelancers applications view.
import * as React from "react";
import Header from '../../components/Header';
import Container from "../../components/Container";
import Padding from "../../components/Spacing/Padding";
import ApplicationInvitations from "./ApplicationInvitations"
import OpenApplications from "./OpenApplications"

const Applications = () => {
  return (
    <React.Fragment>
      <Header />
      <Container>
        <Padding bottom="xl">
          <ApplicationInvitations />
        </Padding>
        <OpenApplications />
      </Container>
    </React.Fragment>
  )
}

export default Applications