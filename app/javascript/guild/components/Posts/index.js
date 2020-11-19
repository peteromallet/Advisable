import React from "react";
import { useQuery } from "@apollo/client";
import { GUILD_POSTS_QUERY } from "./queries";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import Post from "../Post";
import LoadingPosts from "./Loading";
import { GuildBox } from "@guild/styles";
import { feedStore } from "@guild/stores/Feed";
import { Stack, Text } from "@advisable/donut";
import GuildTag from "@guild/components/GuildTag";
import { cursorLoadMore } from "@guild/utils";

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
    variables: { selectedFilter, selectedTopicsIds: selectedTopicsIds() },
  });

  useBottomScrollListener(() => {
    if (data?.guildPosts && !loading) {
      cursorLoadMore({
        data,
        fetchMore,
        collectionKey: "guildPosts",
      });
    }
  });

  return loading ? (
    <LoadingPosts />
  ) : (
    <Stack spacing="4">
      {data &&
        data.guildPosts.nodes.map((post) => <Post key={post.id} post={post} />)}
      {!loading && !data?.guildPosts?.nodes?.length && (
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
      )}
    </Stack>
  );
};

export default Posts;
