import React from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { Box, Container, Text } from "@advisable/donut";
import NavigationMenu from "./NavigationMenu";
import { StyledSidebar } from "./styles";
import { SELECT_DATA, GET_PREVIOUS_PROJECT } from "./queries";
import PreviousProjectFormHeader from "./PreviousProjectFormHeader";
import Overview from "./Overview";
import Portfolio from "./Portfolio";
import Validation from "./Validation";
import UpdateClientDetails from "./UpdateClientDetails";
import CreatePreviousProject from "./CreatePreviousProject";
import ErrorBoundary from "./ErrorBoundary";
import NotFound from "./NotFound";
import Loading from "./Loading";

function RedirectToFirstStep() {
  const location = useLocation();
  return <Redirect to={`${location.pathname}/client`} />;
}

export default function PreviousProjectFormContainer({
  modal,
  specialistId,
  onCreate,
  onPublish,
}) {
  const route = useRouteMatch("*previous_projects/:id");
  const id = route?.params.id;
  const hasProjectId = id && id !== "new";
  const selectDataQuery = useQuery(SELECT_DATA);
  const { data, loading, error } = useQuery(GET_PREVIOUS_PROJECT, {
    skip: !hasProjectId,
    variables: {
      id: route?.params.id,
    },
  });

  if (selectDataQuery.loading || loading) return <Loading modal={modal} />;

  return (
    <>
      <PreviousProjectFormHeader modal={modal} data={data}>
        <Text color="blue900">
          {data ? "Edit previous project" : "Add a previous project"}
        </Text>
      </PreviousProjectFormHeader>
      {error && <NotFound id={route?.params.id} />}
      {!error && (
        <ErrorBoundary>
          <Box
            paddingBottom={["40px", "0px"]}
            paddingLeft={{ _: 0, m: "250px" }}
          >
            <StyledSidebar display={["none", "none", "block"]}>
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
                    industries={selectDataQuery.data.industries}
                  />
                </Route>
                <Route path="*previous_projects/:id/client">
                  <UpdateClientDetails
                    modal={modal}
                    data={data}
                    industries={selectDataQuery.data.industries}
                  />
                </Route>
                <Route path="*previous_projects/:id/overview">
                  <Overview
                    modal={modal}
                    data={data}
                    skills={selectDataQuery.data.skills}
                  />
                </Route>
                <Route path="*previous_projects/:id/portfolio">
                  <Portfolio modal={modal} data={data} />
                </Route>
                <Route path="*previous_projects/:id/validation">
                  <Validation modal={modal} data={data} onPublish={onPublish} />
                </Route>
              </Switch>
            </Container>
          </Box>
        </ErrorBoundary>
      )}
    </>
  );
}
