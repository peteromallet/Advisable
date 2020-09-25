import React, { lazy } from "react";
import { useQuery } from "@apollo/client";
import { Container, useBreakpoint } from "@advisable/donut";
import {
  Route,
  useParams,
  useLocation,
  Switch,
  Redirect,
} from "react-router-dom";
import View from "components/View";
import Loading from "components/Loading";
import { handleAuthError } from "./utilities";
import NotFound, { isNotFound } from "../NotFound";
import AccessDenied from "components/AccessDenied";
import { GET_PROJECT } from "./queries";
import ProjectRoutes from "./ProjectRoutes";
import Navigation from "./Navigation";

const ProjectSetup = lazy(() => import("./ProjectSetup"));
const SETUP_STATUSES = ["DRAFT", "PENDING_REVIEW"];

export default function Project() {
  const { id } = useParams();
  const location = useLocation();
  const isLargerScreen = useBreakpoint("lUp");
  const { loading, data, error } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  if (loading) return <Loading />;

  // Handle API errors.
  if (error) {
    const redirect = handleAuthError(error, location);
    if (redirect) return <Redirect to={redirect} />;
    if (isNotFound(error)) return <NotFound />;
  }

  const { project } = data;
  if (!project.viewerCanAccess) return <AccessDenied />;

  if (project?.status === "Brief Pending Confirmation") {
    return <Redirect to={`/project_setup/${project.id}`} />;
  }

  if (SETUP_STATUSES.includes(project.status)) {
    return (
      <Switch>
        <Route path="/projects/:id/setup" component={ProjectSetup} />
        <Redirect to={`/projects/${project.id}/setup`} />
      </Switch>
    );
  }

  return (
    <View>
      <Route path="/projects/:id" exact={!isLargerScreen}>
        <View.Sidebar width={["100%", "100%", "100%", "280px"]}>
          <Navigation data={data} />
        </View.Sidebar>
      </Route>
      <View.Content>
        <Container height="100%" maxWidth="1100px">
          <ProjectRoutes project={data.project} />
        </Container>
      </View.Content>
    </View>
  );
}
