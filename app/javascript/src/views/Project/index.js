import React from "react";
import { graphql } from "react-apollo";
import { Switch, Route, Redirect } from "react-router-dom";
import { Container } from "./styles";
import NotFound from "src/views/NotFound";
import CreateOffer from "./views/CreateOffer";
import CounterOffer from "./views/CounterOffer";
import Applicants from "./components/Applicants";
import Navigation from "src/components/Navigation";
import View from "src/components/View";
import LoadingCandidates from "./components/LoadingCandidates";
import FETCH_PROJECT from "./graphql/fetchProject.graphql";

class Project extends React.Component {
  render() {
    const { match, loading, data } = this.props;
    if (data.loading) return <LoadingCandidates />;
    if (data.error) return <div>Something went wrong</div>;
    if (!data.project) return <NotFound />;

    return (
      <View>
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
                    countLabel="Accepted"
                    emptyStateText="You have not requested introduction to any applicants"
                    {...props}
                  />
                )}
              />
              <Route
                path={`${match.path}/offered`}
                render={props => (
                  <Applicants
                    data={data}
                    status="Offered"
                    countLabel="Offered"
                    emptyStateText="You have not sent any offers yet"
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
                    countLabel="Rejected"
                    emptyStateText="You have not rejected any applicants"
                    {...props}
                  />
                )}
              />
              <Route
                path={`${match.path}/applications/:applicationID/offer`}
                component={CreateOffer}
              />
              <Route
                path={`${match.path}/offers/:bookingID`}
                component={CounterOffer}
              />
              <Redirect to={`${match.url}/introduced`} />
            </Switch>
          )}
        </Container>
      </View>
    );
  }
}

export default graphql(FETCH_PROJECT, {
  options: ({ match }) => ({
    variables: {
      id: match.params.projectID
    }
  })
})(Project);
