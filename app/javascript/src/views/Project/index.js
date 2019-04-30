import React from "react";
import { Query } from "react-apollo";
import { Switch, Route, Redirect } from "react-router-dom";

import Loading from "src/components/Loading";
import Candidates from "../Candidates";
import NotFound from "../NotFound";
import InterviewAvailability from "../InterviewAvailability";
import FETCH_PROJECT from "./fetchProject.graphql";
import ScheduleSetupCall from "./ScheduleSetupCall";

const redirectError = (error, location) => {
  let redirect;

  if (error.message === "signupRequired") {
    redirect = {
      pathname: error.extensions.redirect,
      search: `?email=${encodeURIComponent(error.extensions.email)}`,
      state: {
        from: location,
        notice: "projects.signupRequired",
      },
    };
  }

  if (error.message === "authenticationRequired") {
    redirect = {
      pathname: error.extensions.redirect,
      search: `?email=${encodeURIComponent(error.extensions.email)}`,
      state: {
        from: location,
      },
    };
  }

  return redirect;
};

const Project = ({ location, match: { path, params } }) => {
  return (
    <Query
      query={FETCH_PROJECT}
      variables={{ id: params.projectID }}
      errorPolicy="all"
    >
      {query => {
        if (query.loading) return <Loading />;

        // If there is an error check that the API hasn't returned redirect
        // instructions. This is a rare case where we want to redirect users
        // to either signup or login based on wether the project client has
        // an account
        if (query.error && query.error.graphQLErrors.length > 0) {
          let error = query.error.graphQLErrors[0];
          let redirect = redirectError(error, location);
          if (redirect) {
            return <Redirect to={redirect} />;
          }
        }

        if (!query.data.project) {
          return <NotFound />;
        }

        const project = query.data.project;
        if (project && project.status === "Project Created") {
          return <ScheduleSetupCall project={project} />;
        }

        if (project && project.status === "Brief Pending Confirmation") {
          return <Redirect to={`/project_setup/${project.airtableId}`} />;
        }

        return (
          <Switch>
            <Route
              path={`${path}/interviews/:interviewID/availability`}
              component={InterviewAvailability}
            />
            <Route path={`${path}/:status?`} component={Candidates} />
          </Switch>
        );
      }}
    </Query>
  );
};

export default Project;
