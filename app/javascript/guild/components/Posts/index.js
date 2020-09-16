import React from "react";
import { GUILD_POSTS_QUERY } from "./queries";
import { useQuery } from "@apollo/client";
// import Loading from "@advisable-main/components/Loading";
import Post from "../Post";
import { GuildBox } from "@guild/styles";
import { useScrolledToBottom } from "@guild/hooks/useScrolledToBottom";
import { feedStore } from "@guild/stores/Feed";
import { Text } from "@advisable/donut";
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
    variables: { selectedFilter, selectedTopicsIds: selectedTopicsIds() },
  });
  const { bottomReached } = useScrolledToBottom();

  /* 
    https://www.apollographql.com/docs/react/data/pagination/#cursor-based
    https://graphql-ruby.org/pagination/using_connections.html
  */
  const handleLoadMore = () => {
    const { guildPosts } = data;
    fetchMore({
      variables: {
        cursor: guildPosts?.pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newNodes = fetchMoreResult.guildPosts.nodes;
        const pageInfo = fetchMoreResult.guildPosts.pageInfo;

        return newNodes.length
          ? {
              /* 
                Put the new guild posts at the end of the list and update `pageInfo`
                so we have the new `endCursor` and `hasNextPage` values
              */
              guildPosts: {
                __typename: previousResult.guildPosts.__typename,
                nodes: [...previousResult.guildPosts.nodes, ...newNodes],
                pageInfo,
              },
            }
          : previousResult;
      },
    });
  };

  // if (loading) return <Loading />;
  if (bottomReached && data?.guildPosts) handleLoadMore();

  return (
    <GuildBox
      flexGrow={1}
      width="100%"
      display="flex"
      flexBasis="640px"
      spaceChildrenVertical={40}
      mb="xxl"
    >
      {data &&
        data.guildPosts.nodes.map((post, idx) => (
          <Post key={idx} post={post} />
        ))}
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
    </GuildBox>
  );
};

export default Posts;
