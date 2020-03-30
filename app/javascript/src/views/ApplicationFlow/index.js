import * as React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFound from "../NotFound";
import { Loading } from "../../components";
import ApplicationFlow from "./ApplicationFlow";
import ApplicationSent from "./ApplicationSent";
import FETCH_APPLICATION from "./fetchApplication";
import ApplicationsClosed from "../ApplicationsClosed";

// Renders the application flow
function ApplicationFlowContainer(props) {
  const { applicationId } = props.match.params;
  const locationState = props.location.state || {};

  const query = useQuery(FETCH_APPLICATION, {
    variables: {
      id: applicationId,
    },
  });

  if (query.loading) return <Loading />;

  if (query.error) {
    const code = query.error?.graphQLErrors?.[0]?.extensions.code;
    if (code === "recordNotFound") {
      return <NotFound />;
    } else {
      throw query.error.message;
    }
  }

  const application = query.data?.application;
  if (!application) return <NotFound />;

  const open = application?.project.applicationsOpen;
  if (!open) return <ApplicationsClosed />;

  // If the application has been rejected and there is no "allowApply"
  // key on the locaiton state then redirect to the job listing page.
  // The user can then choose to apply from there which will set the
  // allowApply location state.
  let isRejected = application.status === "Invitation Rejected";
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
        render={(props) => {
          return <ApplicationFlow {...props} application={application} />;
        }}
      />
    </Switch>
  );
}

export default ApplicationFlowContainer;
