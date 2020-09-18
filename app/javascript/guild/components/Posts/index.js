import React from "react";
import { GUILD_POSTS_QUERY } from "./queries";
import { useQuery } from "@apollo/client";
import Loading from "@advisable-main/components/Loading";
import Post from "../Post";
import { GuildBox } from "@guild/styles";
import { useScrolledToBottom } from "@guild/hooks/useScrolledToBottom";
import shallow from "zustand/shallow";
import { feedStore } from "@guild/stores/Feed";

const Posts = () => {
  const { selectedFilter } = feedStore(
    ({ selectedFilter }) => ({ selectedFilter }),
    shallow,
  );

  const { data, loading, fetchMore } = useQuery(GUILD_POSTS_QUERY, {
    variables: { selectedFilter },
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

  if (loading) return <Loading />;
  if (bottomReached) handleLoadMore();

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
    </GuildBox>
  );
};

export default Posts;
