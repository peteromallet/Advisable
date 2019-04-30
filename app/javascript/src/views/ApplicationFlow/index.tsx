import * as React from "react";
import { Query } from "react-apollo";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFound from "../NotFound";
import BaseStyling from "../../BaseStyling";
import { Loading } from "../../components";
import { useScreenSize } from "../../utilities/screenSizes";
import ApplicationFlow from "./ApplicationFlow";
import ApplicationSent from "./ApplicationSent";
import FETCH_APPLICATION from "./fetchApplication.graphql";
import { RouteComponentProps } from "react-router";
import { ApplicationType } from "../../types";

type Params = {
  applicationId: string;
};

interface LocationState {
  allowApply?: boolean;
}

// Renders the application flow
export default (props: RouteComponentProps<Params>): React.ReactNode => {
  const { applicationId } = props.match.params;
  const isMobile: boolean = useScreenSize("small");
  let locationState: LocationState = props.location.state || {};

  return (
    <React.Fragment>
      <BaseStyling lightBackground={isMobile} />
      <Query query={FETCH_APPLICATION} variables={{ id: applicationId }}>
        {query => {
          if (query.loading) return <Loading />;
          if (!query.data.application) return <NotFound />;
          let application: ApplicationType = query.data.application;

          // If the application has been rejected and there is no "allowApply"
          // key on the locaiton state then redirect to the job listing page.
          // The user can then choose to apply from there which will set the
          // allowApply location state.
          let isRejected: boolean = application.status === "Invitation Rejected";
          if (locationState.allowApply !== true && isRejected) {
            let url = `/invites/${props.match.params.applicationId}`;
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
