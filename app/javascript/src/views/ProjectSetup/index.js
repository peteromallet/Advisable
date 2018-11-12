// Renders the setupflow for a project
import React, { Fragment } from "react";
import Header from "src/components/Header";
import { Route, Switch } from "react-router-dom";
import NotFound from 'src/views/NotFound'
import { Container } from "./styles";
import ProjectConfirmation from "./ProjectConfirmation";

const ProjectSetup = ({ match }) => {
  return (
    <Fragment>
      <Header />
      <Container>
        <Switch>
          {/* When the flow for adding a new project is added, the route should be added here */}
          <Route path={`${match.path}/:projectID`} component={ProjectConfirmation} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </Fragment>
  );
};

export default ProjectSetup;
