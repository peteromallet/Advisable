import React from "react";
import { graphql } from "react-apollo";
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "src/components/Layout";
import Loading from "src/components/Loading";
import FETCH_APPLICATION from "./fetchApplication.graphql";
import NotFound from "../NotFound";
import Proposal from "./Proposal";
import Sidebar from "./Sidebar";
import ApplicationDetails from "./ApplicationDetails";
import handleAuthError from "../../utilities/handleAuthError";

const Applicant = ({ data, match, history, location }) => {
  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [match.params.applicationID]);

  if (data.loading) return <Loading />;

  if (data.error) {
    const error = data.error.graphQLErrors[0];
    let redirect = handleAuthError(error, location);

    if (redirect) {
      return <Redirect to={redirect} />;
    }
  }

  if (!data.project) {
    return <NotFound />;
  }

  if (data.project.application.status === "Working") {
    return <Redirect to={`/manage/${data.project.application.airtableId}`} />;
  }

  return (
    <Layout>
      <Sidebar data={data} match={match} history={history} />
      <Layout.Main>
        <Switch>
          <Route
            exact={true}
            path={match.path}
            render={route => <ApplicationDetails {...route} data={data} />}
          />
          <Route path={`${match.path}/proposal`} component={Proposal} />
          <Route render={() => <Redirect to={match.url} />} />
        </Switch>
      </Layout.Main>
    </Layout>
  );
};

export default graphql(FETCH_APPLICATION, {
  options: props => ({
    variables: {
      projectID: props.match.params.projectID,
      applicationID: props.match.params.applicationID,
    },
  }),
})(Applicant);
