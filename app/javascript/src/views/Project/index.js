import React from "react";
import { graphql } from "react-apollo";
import { Switch, Route, Redirect } from "react-router-dom";
import { Container } from "./styles";
import { Mobile } from "src/components/Breakpoint";
import NotFound from "src/views/NotFound";
import Loading from "src/components/Loading";
import Applicants from "./components/Applicants";
import SharePrompt from "./components/SharePrompt";
import FETCH_PROJECT from "./graphql/fetchProject.graphql";
import ProjectNavigation from "./ProjectNavigation";
import View from "src/components/View";
import { ApplicantsContainer } from "./styles";

const Project = ({ match, data }) => {
  return (
    <View>
      {data.loading ? (
        <Loading />
      ) : (
        <Mobile>
          {isMobile => (
            <Container>
              <Route
                path={match.path}
                exact={isMobile}
                render={route => <ProjectNavigation {...route} data={data} />}
              />
              <ApplicantsContainer>
                {data.project.clientReferralUrl && (
                  <Route
                    path={`${match.path}/applied`}
                    render={props => (
                      <SharePrompt
                        projectID={data.project.id}
                        url={data.project.clientReferralUrl}
                        onDismiss={() => this.forceUpdate()}
                      />
                    )}
                  />
                )}
                <Switch>
                  <Route
                    path={`${match.path}/applied`}
                    render={props => (
                      <Applicants
                        data={data}
                        status="Applied"
                        emptyStateText="You have no more applications to review"
                        emptyStateSubText="We're busy finding applicants for you. We'll be in touch when we've found some great people for you."
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
                        emptyStateText="You have not requested introductions to any applicants"
                        {...props}
                      />
                    )}
                  />
                  <Route
                    path={`${match.path}/proposed`}
                    render={props => (
                      <Applicants
                        data={data}
                        status="Proposed"
                        countLabel="Proposed"
                        emptyStateText="No candidates have made a proposal"
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
                  {!isMobile && <Redirect to={`${match.url}/applied`} />}
                </Switch>
              </ApplicantsContainer>
            </Container>
          )}
        </Mobile>
      )}
    </View>
  );
};

export default graphql(FETCH_PROJECT, {
  options: ({ match }) => ({
    variables: {
      id: match.params.projectID
    }
  })
})(Project);
