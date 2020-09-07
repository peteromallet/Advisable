import React from "react";
import { useBreakpoint } from "@advisable/donut";
import {
  Switch,
  Route,
  useParams,
  useRouteMatch,
  Redirect,
} from "react-router-dom";
import Inbox from "./Inbox";
import Candidates from "./Candidates";
import CandidateDetails from "./CandidateDetails";

export default function ProjectRoutes({ project }) {
  const { id } = useParams();
  const { path, url } = useRouteMatch();
  const isLargerScreen = useBreakpoint("lUp");

  return (
    <Switch>
      <Route path={`${path}/matches`} exact>
        <Inbox project={project} />
      </Route>
      <Route path={`${path}/candidates/:applicationId`}>
        <CandidateDetails project={project} />
      </Route>
      <Route path={`${path}/candidates`}>
        <Candidates project={project} />
      </Route>
      <Route path={`${path}/settings`}>Settings</Route>
      <Redirect
        from={`${path}/applications/:applicationId`}
        to={`${path}/candidates/:applicationId`}
      />
      <Route path="*">
        {isLargerScreen ? (
          <Redirect to={`${url}/matches`} />
        ) : (
          <Redirect to={`/projects/${id}`} />
        )}
      </Route>
    </Switch>
  );
}
