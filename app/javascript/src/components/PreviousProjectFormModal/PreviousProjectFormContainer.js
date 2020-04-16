import React from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { Box, Container } from "@advisable/donut";
import NavigationMenu from "./NavigationMenu";
import { StyledDialogContent, StyledSidebar } from "./styles";
import { GET_PREVIOUS_PROJECT } from "./queries";
import PreviousProjectFormHeader from "./PreviousProjectFormHeader";
import Overview from "./Overview";
import Portfolio from "./Portfolio";
import Validation from "./Validation";
import UpdateClientDetails from "./UpdateClientDetails";
import CreatePreviousProject from "./CreatePreviousProject";
import ErrorBoundary from "./ErrorBoundary";
import NotFound from "./NotFound";

function RedirectToFirstStep() {
  const location = useLocation();
  return <Redirect to={`${location.pathname}/client`} />;
}

export default function PreviousProjectFormContainer({
  modal,
  specialistId,
  onCreate,
}) {
  const route = useRouteMatch("*previous_projects/:id");
  const id = route?.params.id;
  const hasProjectId = id && id !== "new";
  const { data, loading, error } = useQuery(GET_PREVIOUS_PROJECT, {
    skip: !hasProjectId,
    variables: {
      id: route?.params.id,
    },
  });

  if (hasProjectId && loading) return <div>loading...</div>;

  return (
    <>
      <PreviousProjectFormHeader modal={modal} data={data} />
      {error && <NotFound id={route?.params.id} />}
      {!error && (
        <ErrorBoundary>
          <StyledDialogContent>
            <StyledSidebar>
              <NavigationMenu previousProject={data?.previousProject} />
            </StyledSidebar>
            <Container maxWidth="1100px" py="l">
              <Switch>
                <Route path="*previous_projects/:id" exact>
                  <RedirectToFirstStep />
                </Route>
                <Route path="*previous_projects/new" exact>
                  <RedirectToFirstStep />
                </Route>
                <Route path="*previous_projects/new/client">
                  <CreatePreviousProject
                    specialistId={specialistId}
                    onCreate={onCreate}
                  />
                </Route>
                <Route path="*previous_projects/:id/client">
                  <UpdateClientDetails modal={modal} data={data} />
                </Route>
                <Route path="*previous_projects/:id/overview">
                  <Overview modal={modal} data={data} />
                </Route>
                <Route path="*previous_projects/:id/portfolio">
                  <Portfolio modal={modal} data={data} />
                </Route>
                <Route path="*previous_projects/:id/validation">
                  <Validation modal={modal} data={data} />
                </Route>
              </Switch>
            </Container>
          </StyledDialogContent>
        </ErrorBoundary>
      )}
    </>
  );
}
