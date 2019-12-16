import React from "react";
import { get } from "lodash";
import Rollbar from "rollbar";
import { useQuery } from "react-apollo";
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "src/components/Layout";
import Loading from "src/components/Loading";
import AccessDenied from "src/components/AccessDenied";
import NotFound from "../NotFound";
import handleAuthError from "../../utilities/handleAuthError";
import Sidebar from "./Sidebar";
import Proposal from "./Proposal";
import FETCH_APPLICATION from "./fetchApplication";
import ApplicationDetails from "./ApplicationDetails";

const Applicant = ({ match, history, location }) => {
  const { loading, data, error } = useQuery(FETCH_APPLICATION, {
    variables: {
      projectID: match.params.projectID,
      applicationID: match.params.applicationID,
    },
  });

  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [match.params.applicationID]);

  if (loading) return <Loading />;

  if (error) {
    let redirect = handleAuthError(error.graphQLErrors[0], location);

    if (redirect) {
      return <Redirect to={redirect} />;
    }

    if (get(error, "graphQLErrors[0].extensions.code") === "notFound") {
      return <NotFound />;
    }

    if (error?.graphQLErrors[0].code === "invalidPermissions") {
      return <AccessDenied />;
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

export default Applicant;
