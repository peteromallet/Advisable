import React from "react";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import BottomScrollListener from "react-bottom-scroll-listener";
import { Stack, Box, Text } from "@advisable/donut";
import { GUILD_TOPIC_POSTS_QUERY } from "./queries";
import Post from "@guild/components/Post";
import LoadingPosts from "@guild/components/Posts/Loading";
import FollowTopic from "@guild/components/FollowTopic";
import NoResults from "@guild/components/NoResults";

const TopicPosts = ({ topicId }) => {
  const history = useHistory();
  const historyPopped = history.action === "POP";

  const { data, loading, fetchMore } = useQuery(GUILD_TOPIC_POSTS_QUERY, {
    fetchPolicy: historyPopped ? "cache-first" : "network-only",
    nextFetchPolicy: historyPopped ? "cache-first" : "cache-and-network",
    notifyOnNetworkStatusChange: true,
    variables: { topicId },
    errorPolicy: "none",
    onError(err) {
      if (err?.graphQLErrors?.[0]?.extensions?.type === "NOT_AUTHENTICATED") {
        const path = encodeURIComponent(`/guild${location.pathname}`);
        window.location = `/login?redirect=${path}`;
      }
    },
  });

  const hasNextPage = data?.guildTopicPosts.pageInfo.hasNextPage || false;
  const endCursor = data?.guildTopicPosts.pageInfo.endCursor;
  const posts = data?.guildTopicPosts.edges.map((e) => e.node) || [];

  const onReachedBottom = () => {
    if (!loading && hasNextPage) {
      fetchMore({ variables: { cursor: endCursor } });
    }
  };

  return (
    <>
      <BottomScrollListener
        onBottom={onReachedBottom}
        offset={64}
        debounce={0}
      />
      <FollowTopic topicId={topicId} />
      <Stack spacing="4">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </Stack>
      {loading ? <LoadingPosts skeletonPosts={hasNextPage ? 1 : 3} /> : null}
      {!loading && posts.length === 0 ? <NoResults /> : null}

      {posts.length > 0 && !hasNextPage ? (
        <Box py="12" textAlign="center">
          <Text color="neutral500">You have reached the end of the feed.</Text>
        </Box>
      ) : null}
    </>
  );
};

export default TopicPosts;
