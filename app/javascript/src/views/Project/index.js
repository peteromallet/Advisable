import React from "react";
import { get } from "lodash";
import { graphql } from "react-apollo";
import { Redirect } from "react-router-dom";

import Loading from "src/components/Loading";
import Project from "./Project";
import NotFound from "../NotFound";
import FETCH_PROJECT from "./fetchProject";
import ScheduleSetupCall from "./ScheduleSetupCall";
import STATUSES from "./statuses";

// Returns the redirect location for a graphql error based off of its error code
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

const ProjectContainer = ({ data, match, location, ...rest }) => {
  const statusParam = get(match.params, "status");
  const project = get(data, "project");
  if (data.loading) return <Loading />;

  // If there is an error check that the API hasn't returned redirect
  // instructions. This is a rare case where we want to redirect users
  // to either signup or login based on wether the project client has
  // an account
  if (data.error && data.error.graphQLErrors.length > 0) {
    let error = data.error.graphQLErrors[0];
    let redirect = redirectError(error, location);
    if (redirect) {
      return <Redirect to={redirect} />;
    }
  }

  // Render not found if there is no project
  if (!project) return <NotFound />;

  // If the status is not a valid status then render not found
  if (Boolean(statusParam) && !STATUSES[statusParam]) return <NotFound />;

  // If the project is in a created state then load the schedule call component
  if (project && project.status === "Project Created") {
    return <ScheduleSetupCall project={project} />;
  }

  // If the project has not been setup yet then redirect to the project setup
  if (project && project.status === "Brief Pending Confirmation") {
    return <Redirect to={`/project_setup/${project.airtableId}`} />;
  }

  return <Project data={data} match={match} location={location} {...rest} />;
};

export default graphql(FETCH_PROJECT, {
  options: props => ({
    variables: {
      id: props.match.params.projectId,
    },
  }),
})(ProjectContainer);
