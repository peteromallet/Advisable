import React from "react";
import { useQuery } from "@apollo/client";
import { useRouteMatch } from "react-router-dom";
import { Box, Container, Text } from "@advisable/donut";
import useViewer from "@advisable-main/hooks/useViewer";
import NavigationMenu from "./NavigationMenu";
import { GUILD_POST_QUERY } from "@guild/views/Post/queries";
import { SELECT_DATA } from "./queries";
import ComposerHeader from "./ComposerHeader";
import ErrorBoundary from "@guild/components/ErrorBoundary";
import { StyledSidebar } from "@advisable-main/components/PreviousProjectFormModal/styles";
import NotFound from "@advisable-main/components/PreviousProjectFormModal/NotFound";
import Loading from "@advisable-main/components/PreviousProjectFormModal/Loading";
import Routes from "./Routes";

const CreatePostContainer = ({ modal, onPublish }) => {
  const route = useRouteMatch("*composer/:id");
  const id = route?.params.id;
  const hasPostId = id && id !== "new";
  const viewer = useViewer();

  const { data, loading, error: queryError } = useQuery(GUILD_POST_QUERY, {
    skip: !hasPostId,
    variables: {
      id: route?.params?.id,
    },
  });
  const selectDataQuery = useQuery(SELECT_DATA);
  if (selectDataQuery.loading || loading) return <Loading modal={modal} />;

  const authorId = data?.guildPost?.author?.id;
  const error = queryError || (authorId && authorId !== viewer.id);

  return (
    <>
      <ComposerHeader modal={modal}>
        <Text color="blue900">
          {data?.guildPost ? `Edit Guild Post` : "Create a Guild Post"}
        </Text>
      </ComposerHeader>
      {error && <NotFound resource="Post" id={route?.params.id} />}
      {!error && (
        <ErrorBoundary>
          <Box
            paddingBottom={["40px", "0px"]}
            paddingLeft={{ _: 0, m: "250px" }}
          >
            <StyledSidebar display={["none", "none", "block"]}>
              <NavigationMenu guildPost={data?.guildPost} />
            </StyledSidebar>
            <Container maxWidth="1100px" py="l">
              <Routes
                data={data}
                modal={modal}
                onPublish={onPublish}
                selectDataQuery={selectDataQuery}
              />
            </Container>
          </Box>
        </ErrorBoundary>
      )}
    </>
  );
};

export default CreatePostContainer;
