import React from "react";
import { useQuery } from "@apollo/client";
import { Container, useBreakpoint } from "@advisable/donut";
import { Route, useParams, useLocation, Redirect } from "react-router-dom";
import View from "components/View";
import Loading from "components/Loading";
import AccessDenied from "components/AccessDenied";
import handleAuthError from "../../utilities/handleAuthError";
import NotFound, { isNotFound } from "../NotFound";
import { GET_PROJECT } from "./queries";
import ProjectRoutes from "./ProjectRoutes";
import Navigation from "./Navigation";

export default function Project() {
  const { id } = useParams();
  const location = useLocation();
  const isLargerScreen = useBreakpoint("lUp");
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
      <Route path="/projects/:id" exact={!isLargerScreen}>
        <View.Sidebar width={["100%", "100%", "100%", "280px"]}>
          <Navigation data={data} />
        </View.Sidebar>
      </Route>
      <View.Content>
        <Container maxWidth="1100px">
          <ProjectRoutes project={data.project} />
        </Container>
      </View.Content>
    </View>
  );
}
