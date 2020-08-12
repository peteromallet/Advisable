import React from "react";
import { useQuery } from "@apollo/client";
import { Container } from "@advisable/donut";
import { useParams, useLocation, Redirect } from "react-router-dom";
import View from "components/View";
import Loading from "components/Loading";
import AccessDenied from "components/AccessDenied";
import handleAuthError from "../../utilities/handleAuthError";
import NotFound, { isNotFound } from "../NotFound";
import { GET_PROJECT } from "./queries";
import ProjectRoutes from "./ProjectRoutes";

export default function Project() {
  const { id } = useParams();
  const location = useLocation();
  const { loading, data, error } = useQuery(GET_PROJECT, { variables: { id } });

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

  return (
    <View>
      <View.Sidebar>Sidebar</View.Sidebar>
      <View.Content>
        <Container maxWidth="1100px">
          <ProjectRoutes />
        </Container>
      </View.Content>
    </View>
  );
}
