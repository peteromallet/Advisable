import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import View from "src/components/View";
import { Container } from "./styles";
import Applicants from "./containers/Applicants";
import Navigation from "./components/Navigation";

const Project = ({ match }) => {
  return (
    <React.Fragment>
      <Navigation />
      <View>
        <Container>
          <Switch>
            <Route
              path={`${match.path}/applied`}
              render={props => <Applicants status="Applied" {...props} />}
            />
            <Route
              path={`${match.path}/introduced`}
              render={props => (
                <Applicants status="Application Accepted" {...props} />
              )}
            />
            <Route
              path={`${match.path}/rejected`}
              render={props => (
                <Applicants status="Application Rejected" {...props} />
              )}
            />
            <Redirect to={`${match.url}/applied`} />
          </Switch>
        </Container>
      </View>
    </React.Fragment>
  );
};

export default Project;
