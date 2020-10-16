import { useQuery } from "@apollo/client";
import { useRouteMatch } from "react-router-dom";
import { Box, Container, Text } from "@advisable/donut";
import NavigationMenu from "./NavigationMenu";
import { StyledSidebar } from "./styles";
import { SELECT_DATA, GET_PREVIOUS_PROJECT } from "./queries";
import PreviousProjectFormHeader from "./PreviousProjectFormHeader";
import ErrorBoundary from "./ErrorBoundary";
import NotFound from "./NotFound";
import Loading from "./Loading";
import Routes from "./Routes";

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
      <PreviousProjectFormHeader modal={modal}>
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
              <Routes
                data={data}
                modal={modal}
                onCreate={onCreate}
                onPublish={onPublish}
                specialistId={specialistId}
                selectDataQuery={selectDataQuery}
              />
            </Container>
          </Box>
        </ErrorBoundary>
      )}
    </>
  );
}
