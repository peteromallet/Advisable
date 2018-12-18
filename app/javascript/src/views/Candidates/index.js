import React from "react";
import { graphql } from "react-apollo";
import { Route, Redirect } from "react-router-dom";
import { Container } from "./styles";
import Loading from "src/components/Loading";
import Applicants from "./components/Applicants";
import SharePrompt from "./components/SharePrompt";
import FETCH_PROJECT from "./graphql/fetchProject.graphql";
import ProjectNavigation from "./ProjectNavigation";
import View from "src/components/View";
import useMobile from "src/utilities/useMobile";
import { ApplicantsContainer } from "./styles";

const STATUSES = {
  applied: {
    status: "Applied",
    emptyStateText: "You have no more applications to review",
    emptyStateSubText:
      "We're busy finding applicants for you. We'll be in touch when we've found some great people for you."
  },
  introduced: {
    status: "Application Accepted",
    countLabel: "Accepted",
    emptyStateText: "You have not requested introductions to any applicants"
  },
  proposed: {
    status: "Proposed",
    countLabel: "Proposed",
    emptyStateText: "No candidates have made a proposal"
  },
  offered: {
    status: "Offered",
    countLabel: "Offered",
    emptyStateText: "You have not sent any offers yet"
  },
  rejected: {
    status: "Application Rejected",
    countLabel: "Rejected",
    emptyStateText: "You have not rejected any applicants"
  }
};

const Project = ({ match, data }) => {
  window.scrollTo(0, 0)
  const isMobile = useMobile();
  const slug = match.params.status;

  if (slug && !STATUSES[slug]) {
    return <Redirect to={`/projects/${match.params.projectID}/applied`} />
  }

  if (!isMobile && !slug) {
    return <Redirect to={`/projects/${match.params.projectID}/applied`} />
  }

  return (
    <View>
      {data.loading ? (
        <Loading />
      ) : (
        <Container>
          <Route
            exact={isMobile}
            path="/projects/:projectID"
            render={() => <ProjectNavigation match={match} data={data} />}
          />
          {slug && (
            <ApplicantsContainer>
              {data.project.clientReferralUrl &&
                status === "applied" && (
                  <SharePrompt
                    projectID={data.project.id}
                    url={data.project.clientReferralUrl}
                    onDismiss={() => this.forceUpdate()}
                  />
                )}
              <Applicants data={data} {...STATUSES[slug]} />
            </ApplicantsContainer>
          )}
        </Container>
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
