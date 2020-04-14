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
import { StyledDialogContent } from "./styles";
import { GET_PREVIOUS_PROJECT } from "./queries";
import PreviousProjectFormHeader from "./PreviousProjectFormHeader";
import Overview from "./Overview";
import Portfolio from "./Portfolio";
import Validation from "./Validation";
import MoreInformation from "./MoreInformation";
import UpdateClientDetails from "./UpdateClientDetails";
import CreatePreviousProject from "./CreatePreviousProject";

function RedirectToFirstStep() {
  const location = useLocation();
  return <Redirect to={`${location.pathname}/client`} />;
}

export default function PreviousProjectFormContainer({ modal, specialistId }) {
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

  if (hasProjectId && error) return <div>Failed to load project</div>;

  return (
    <>
      <PreviousProjectFormHeader modal={modal} />
      <StyledDialogContent>
        <Container display="flex" py="l">
          <Box width={200} flexShrink={0}>
            <NavigationMenu />
          </Box>
          <Box pl="l">
            <Switch>
              <Route path="*previous_projects/new">
                <CreatePreviousProject specialistId={specialistId} />
              </Route>
              <Route path="*previous_projects/:id" exact>
                <RedirectToFirstStep />
              </Route>
              <Route path="*previous_projects/:id/client">
                <UpdateClientDetails modal={modal} data={data} />
              </Route>
              <Route path="*previous_projects/:id/overview">
                <Overview modal={modal} data={data} />
              </Route>
              <Route path="*previous_projects/:id/portfolio">
                <Portfolio />
              </Route>
              <Route path="*previous_projects/:id/validation">
                <Validation modal={modal} data={data} />
              </Route>
              <Route path="*previous_projects/:id/more">
                <MoreInformation />
              </Route>
            </Switch>
          </Box>
        </Container>
      </StyledDialogContent>
    </>
  );
}
