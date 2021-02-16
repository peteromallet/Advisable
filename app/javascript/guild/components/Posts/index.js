import React from "react";
import { useQuery } from "@apollo/client";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { GUILD_POSTS_QUERY } from "./queries";
import BottomScrollListener from "react-bottom-scroll-listener";
import { feedStore } from "@guild/views/Feed/store";
import Post from "../Post";
import LoadingPosts from "./Loading";
import { GuildBox } from "@guild/styles";
import { Stack, Box, Text } from "@advisable/donut";
import GuildTag from "@guild/components/GuildTag";
import Filters from "@guild/components/Filters";
import FollowTopic from "@guild/components/FollowTopic";
import PopularPosts from "@guild/components/PopularPosts";

const Posts = () => {
  const location = useLocation();
  const { topicId } = useParams();
  const history = useHistory();
  const historyPopped = history.action === "POP";
  const defaultFilter = "For You";

  const postTypeFilter = feedStore((store) => store.postTypeFilter);
  const setPostTypeFilter = (postTypeFilter) => {
    feedStore.setState({ postTypeFilter });
  };
  const clearFilters = () => setPostTypeFilter(defaultFilter);

  const { data, loading, fetchMore } = useQuery(GUILD_POSTS_QUERY, {
    fetchPolicy: historyPopped ? "cache-first" : "network-only",
    nextFetchPolicy: historyPopped ? "cache-first" : "cache-and-network",
    notifyOnNetworkStatusChange: true,
    variables: { topicId, type: postTypeFilter },
    errorPolicy: "none",
    onError(err) {
      if (err?.graphQLErrors?.[0]?.extensions?.type === "NOT_AUTHENTICATED") {
        const path = encodeURIComponent(`/guild${location.pathname}`);
        window.location = `/login?redirect=${path}`;
      }
    },
  });
  const hasNextPage = data?.guildPosts.pageInfo.hasNextPage || false;
  const endCursor = data?.guildPosts.pageInfo.endCursor;

  const isDefaultView = postTypeFilter === defaultFilter && !topicId;

  const posts = data?.guildPosts.edges.map((e) => e.node) || [];
  const [firstResult, ...rest] = posts;
  const latestPosts = isDefaultView && firstResult?.pinned ? rest : posts;

  const topic = data?.guildPosts?.guildTopic;

  const onReachedBottom = () => {
    if (!loading && hasNextPage) {
      fetchMore({ variables: { cursor: endCursor } });
    }
  };

  return (
    <>
      {topicId && topic ? (
        <FollowTopic topic={topic} />
      ) : (
        <Filters
          postTypeFilter={postTypeFilter}
          setPostTypeFilter={setPostTypeFilter}
        />
      )}
      <BottomScrollListener
        onBottom={onReachedBottom}
        offset={topicId ? 64 : 58}
        debounce={0}
      />

      {isDefaultView ? (
        <>
          {firstResult?.pinned ? (
            <Box marginBottom="12">
              <Post walkthrough key={firstResult.id} post={firstResult} />
            </Box>
          ) : null}
          <Box marginBottom="12">
            <Text
              fontSize="xs"
              marginBottom="4"
              color="neutral600"
              fontWeight="medium"
              textTransform="uppercase"
            >
              Popular Posts
            </Text>
            <PopularPosts />
          </Box>

          <Text
            fontSize="xs"
            marginBottom="4"
            color="neutral600"
            fontWeight="medium"
            textTransform="uppercase"
          >
            Latest Posts
          </Text>
        </>
      ) : null}

      <Stack spacing="4">
        {latestPosts.map((post, idx) => (
          <Post
            walkthrough={idx === 0 && !firstResult?.pinned}
            key={post.id}
            post={post}
          />
        ))}
      </Stack>
      {loading ? <LoadingPosts skeletonPosts={hasNextPage ? 1 : 3} /> : null}
      {!loading && posts.length === 0 ? (
        <GuildBox
          background="white"
          spaceChildrenVertical={16}
          flexCenterBoth
          p="xl"
        >
          <Text
            fontSize="xxl"
            fontWeight="medium"
            letterSpacing="-0.01em"
            color="catalinaBlue100"
          >
            No Results
          </Text>
          {!topicId && (
            <GuildTag button size="l" onClick={clearFilters}>
              Clear All Filters
            </GuildTag>
          )}
        </GuildBox>
      ) : null}

      {posts.length > 0 && !hasNextPage ? (
        <Box py="12" textAlign="center">
          <Text color="neutral500">You have reached the end of the feed.</Text>
        </Box>
      ) : null}
    </>
  );
};

export default Posts;
