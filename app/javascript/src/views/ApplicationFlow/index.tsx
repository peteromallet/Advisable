import * as React from "react";
import { get } from "lodash";
import { useQuery } from "react-apollo";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFound from "../NotFound";
import { Loading } from "../../components";
import ApplicationFlow from "./ApplicationFlow";
import ApplicationSent from "./ApplicationSent";
import FETCH_APPLICATION from "./fetchApplication.js";
import { RouteComponentProps } from "react-router";
import ApplicationsClosed from "../ApplicationsClosed";

type Params = {
  applicationId: string;
};

interface LocationState {
  allowApply?: boolean;
}

// Renders the application flow
export default (props: RouteComponentProps<Params>): React.ReactNode => {
  const { applicationId } = props.match.params;
  let locationState: LocationState = props.location.state || {};

  const query = useQuery(FETCH_APPLICATION, {
    variables: {
      id: applicationId,
    },
  });

  if (query.loading) return <Loading />;

  if (query.error) {
    const code = get(query.error, "graphQLErrors[0].extensions.code");
    if (code === "recordNotFound") {
      return <NotFound />;
    } else {
      throw query.error.message;
    }
  }

  const application = get(query, "data.application");
  if (!application) return <NotFound />;

  const open = get(application, "project.applicationsOpen");
  if (!open) return <ApplicationsClosed />;

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
          return <ApplicationFlow {...props} application={application} />;
        }}
      />
    </Switch>
  );
};
