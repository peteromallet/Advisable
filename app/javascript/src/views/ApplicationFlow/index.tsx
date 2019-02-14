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

export default ({ match, location }) => {
  const isMobile = useScreenSize("small");
  let locationState = location.state || {};

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

          // If the application has been rejected and there is no "allowApply"
          // key on the locaiton state then redirect to the job listing page.
          // The user can then choose to apply from there which will set the
          // allowApply location state.
          let isRejected = application.status === 'Application Rejected'
          if (locationState.allowApply !== true && isRejected) {
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
