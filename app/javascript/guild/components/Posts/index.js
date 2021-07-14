import React from "react";
import { useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import { GUILD_POSTS_QUERY } from "./queries";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import { feedStore } from "@guild/views/Feed/store";
import Post from "../Post";
import LoadingPosts from "./Loading";
import { GuildBox } from "@guild/styles";
import { Stack, Box, Text } from "@advisable/donut";
import GuildTag from "@guild/components/GuildTag";
import Filters from "@guild/components/Filters";
import PopularPosts from "@guild/components/PopularPosts";

const Posts = () => {
  const location = useLocation();
  const defaultFilter = "For You";
  const postTypeFilter = feedStore((store) => store.postTypeFilter);
  const setPostTypeFilter = (postTypeFilter) => {
    feedStore.setState({ postTypeFilter });
  };
  const clearFilters = () => setPostTypeFilter(defaultFilter);
  const isDefaultView = postTypeFilter === defaultFilter;

  const { data, loading, fetchMore } = useQuery(GUILD_POSTS_QUERY, {
    notifyOnNetworkStatusChange: true,
    variables: { type: postTypeFilter, withPopularPosts: isDefaultView },
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

  const posts = data?.guildPosts.edges.map((e) => e.node) || [];
  const [firstResult, ...rest] = posts;
  const latestPosts = isDefaultView && firstResult?.pinned ? rest : posts;

  const onReachedBottom = () => {
    if (!loading && hasNextPage) {
      fetchMore({ variables: { cursor: endCursor } });
    }
  };

  return (
    <>
      <Filters
        postTypeFilter={postTypeFilter}
        setPostTypeFilter={setPostTypeFilter}
      />
      <BottomScrollListener
        onBottom={onReachedBottom}
        offset={58}
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
            <PopularPosts loading={loading} posts={data?.guildPopularPosts} />
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
          <GuildTag button size="l" onClick={clearFilters}>
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
