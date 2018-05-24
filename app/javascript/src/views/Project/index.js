import React from "react";
import { Query } from "react-apollo";
import { Switch, Route, Redirect } from "react-router-dom";
import { Container } from "./styles";
import Applicants from "./components/Applicants";
import Navigation from "src/components/Navigation";
import LoadingCandidates from "./components/LoadingCandidates";
import FETCH_PROJECT from "./graphql/fetchProject.graphql";

class Project extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { match } = this.props;
    return (
      <Query query={FETCH_PROJECT} variables={{ id: match.params.projectID }}>
        {({ loading, data, error }) => (
          <Container>
            {loading ? (
              <LoadingCandidates />
            ) : (
              <Switch>
                <Route
                  path={`${match.path}/applied`}
                  render={props => (
                    <Applicants
                      data={data}
                      status="Applied"
                      emptyStateText="You have no more applications to review"
                      {...props}
                    />
                  )}
                />
                <Route
                  path={`${match.path}/introduced`}
                  render={props => (
                    <Applicants
                      data={data}
                      status="Application Accepted"
                      emptyStateText="You have not requested introduction to any applicants"
                      {...props}
                    />
                  )}
                />
                <Route
                  path={`${match.path}/rejected`}
                  render={props => (
                    <Applicants
                      data={data}
                      status="Application Rejected"
                      emptyStateText="You have not rejected any applicants"
                      {...props}
                    />
                  )}
                />
                <Redirect to={`${match.url}/applied`} />
              </Switch>
            )}
          </Container>
        )}
      </Query>
    );
  }
}

export default Project;
