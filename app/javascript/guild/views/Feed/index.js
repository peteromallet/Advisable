import React from "react";
import styled from "styled-components";
import { GUILD_POSTS_QUERY } from "./queries";
import { useQuery } from "@apollo/client";

const Feed = () => {
  const { error, data, loading, fetchMore } = useQuery(GUILD_POSTS_QUERY);

  /* 
    https://www.apollographql.com/docs/react/data/pagination/#cursor-based
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
              // Put the new guild posts at the end of the list and update `pageInfo`
              // so we have the new `endCursor` and `hasNextPage` values
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

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  console.log(data?.guildPosts);

  return (
    <Render.Container>
      This is the guild feed poc
      <div onClick={handleLoadMore}>Load More ..</div>
    </Render.Container>
  );
};

const Render = {
  Container: styled.div``,
};

export default Feed;
