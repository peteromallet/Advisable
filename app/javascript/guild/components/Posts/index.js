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

const Posts = () => {
  const location = useLocation();
  const { topicId } = useParams();
  const history = useHistory();
  const historyPopped = history.action === "POP";

  const postTypeFilter = feedStore((store) => store.postTypeFilter);
  const setPostTypeFilter = (postTypeFilter) => {
    feedStore.setState({ postTypeFilter });
  };
  const clearFilters = () => setPostTypeFilter("For You");

  const { data, loading, fetchMore, error } = useQuery(GUILD_POSTS_QUERY, {
    fetchPolicy: historyPopped ? "cache-first" : "network-only",
    nextFetchPolicy: historyPopped ? "cache-first" : "cache-and-network",
    notifyOnNetworkStatusChange: true,
    variables: { topicId, type: postTypeFilter },
    pollInterval: 300000, // 5 minutes
  });
  const hasNextPage = data?.guildPosts.pageInfo.hasNextPage || false;
  const endCursor = data?.guildPosts.pageInfo.endCursor;

  const posts = data?.guildPosts.edges.map((e) => e.node) || [];
  const topic = data?.guildPosts?.guildTopic;

  const onReachedBottom = () => {
    if (!loading && hasNextPage) {
      fetchMore({ variables: { cursor: endCursor } });
    }
  };

  if (error?.message === "You are not logged in") {
    const path = encodeURIComponent(`/guild${location.pathname}`);
    window.location = `/login?redirect=${path}`;
  }

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

      <Stack spacing="4">
        {posts.map((post, idx) => (
          <Post walkthrough={idx === 0} key={post.id} post={post} />
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
