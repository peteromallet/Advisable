import * as React from "react";
import { Query } from "react-apollo";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFound from "../NotFound";
import BaseStyling from "../../BaseStyling";
import { Header, Loading } from "../../components";
import { useScreenSize } from "../../utilities/screenSizes";
import ApplicationFlow from "./ApplicationFlow";
import ApplicationSent from "./ApplicationSent";
import FETCH_APPLICATION from "./fetchApplication.graphql";

export default ({ match }) => {
  const isMobile = useScreenSize("small");

  return (
    <React.Fragment>
      <Header />
      <BaseStyling lightBackground={isMobile} />
      <Query
        query={FETCH_APPLICATION}
        variables={{ id: match.params.applicationId }}
      >
        {query => {
          if (query.loading) return <Loading />;
          if (!query.data.application) return <NotFound />;
          let { application } = query.data;

          if (application.status === "Application Rejected") {
            let url = `/invites/${match.params.applicationId}`;
            return <Redirect to={url} />;
          }

          return (
            <Switch>
              <Route
                path="/invites/:applicationId/apply/sent"
                component={ApplicationSent}
              />
              <Route
                render={props => {
                  return (
                    <ApplicationFlow {...props} application={application} />
                  );
                }}
              />
            </Switch>
          );
        }}
      </Query>
    </React.Fragment>
  );
};
