import React, { lazy } from "react";
import { useParams, useLocation, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import Loading from "../../components/Loading";
import AccessDenied from "../../components/AccessDenied";
import handleAuthError from "../../utilities/handleAuthError";
import NotFound, { isNotFound } from "../NotFound";
import { GET_JOB } from "./queries";
const JobSetup = lazy(() => import("./JobSetup"));

export default function Job() {
  const { id } = useParams();
  const location = useLocation();
  const { loading, data, error } = useQuery(GET_JOB, { variables: { id } });

  if (loading) return <Loading />;

  // Handle API errors.
  if (error?.graphQLErrors.length > 0) {
    const theError = error.graphQLErrors[0];
    const redirect = handleAuthError(theError, location);
    if (redirect) return <Redirect to={redirect} />;
    if (theError.extensions.code.match(/invalidPermissions/))
      return <AccessDenied />;
    if (isNotFound(error)) return <NotFound />;
  }

  return <JobSetup data={data} />;
}
