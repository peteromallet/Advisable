import React from "react";
import { get } from "lodash";
import { useQuery } from "@apollo/react-hooks";
import { Redirect } from "react-router-dom";
import Loading from "src/components/Loading";
import Project from "./Project";
import NotFound from "../NotFound";
import FETCH_PROJECT from "./fetchProject";
import ScheduleSetupCall from "./ScheduleSetupCall";
import STATUSES from "./statuses";
import AccessDenied from "../../components/AccessDenied";
import handleAuthError from "../../utilities/handleAuthError";

const ProjectContainer = ({ match, location, ...rest }) => {
  const { loading, error, data } = useQuery(FETCH_PROJECT, {
    variables: {
      id: match.params.projectId,
    },
  });

  const statusParam = get(match.params, "status");
  const project = get(data, "project");
  if (loading) return <Loading />;

  // If there is an error check that the API hasn't returned redirect
  // instructions. This is a rare case where we want to redirect users
  // to either signup or login based on wether the project client has
  // an account
  if (error && error.graphQLErrors.length > 0) {
    let theError = error.graphQLErrors[0];
    let redirect = handleAuthError(theError, location);
    if (redirect) {
      return <Redirect to={redirect} />;
    }

    if (theError.code.match(/invalidPermissions/)) {
      return <AccessDenied />;
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

export default ProjectContainer;
