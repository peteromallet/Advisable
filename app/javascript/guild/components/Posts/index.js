import React from "react";
import { useQuery } from "@apollo/client";
import { GUILD_POSTS_QUERY } from "./queries";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import Post from "../Post";
import LoadingPosts from "./Loading";
import { GuildBox } from "@guild/styles";
import { feedStore } from "@guild/stores/Feed";
import { Stack, Box, Text } from "@advisable/donut";
import GuildTag from "@guild/components/GuildTag";

const Posts = () => {
  const [
    selectedFilter,
    selectedTopicsIds,
    resetFilters,
  ] = feedStore(({ selectedFilter, selectedTopicsIds, resetFilters }) => [
    selectedFilter,
    selectedTopicsIds,
    resetFilters,
  ]);

  const { data, loading, fetchMore } = useQuery(GUILD_POSTS_QUERY, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    variables: { selectedFilter, selectedTopicsIds: selectedTopicsIds() },
  });

  const hasNextPage = data?.guildPosts.pageInfo.hasNextPage || false;
  const endCursor = data?.guildPosts.pageInfo.endCursor;

  useBottomScrollListener(() => {
    if (!loading && hasNextPage) {
      fetchMore({ variables: { cursor: endCursor } });
    }
  });

  const posts = data?.guildPosts.edges.map((e) => e.node) || [];

  return (
    <>
      <Stack spacing="4">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
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
          <GuildTag button size="l" onClick={resetFilters}>
            Clear All Filters
          </GuildTag>
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
