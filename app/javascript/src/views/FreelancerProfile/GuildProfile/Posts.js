import React, { useCallback } from "react";
import { useParams } from "react-router";
import { Stack } from "@advisable/donut";
import Post from "@guild/components/Post";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { useGuildPosts } from "../queries";
import Loading from "./Loading";

export default function GuildProfilePosts() {
  const { id } = useParams();
  const { data, loading, fetchMore } = useGuildPosts({
    variables: { id },
  });

  const guildPosts = data?.specialist.guildPosts;
  const hasNextPage = guildPosts?.pageInfo.hasNextPage;
  const endCursor = guildPosts?.pageInfo.endCursor;
  const nodes = guildPosts?.edges.map((edge) => edge.node);

  const loadMorePosts = useCallback(() => {
    if (!hasNextPage) return;
    fetchMore({ variables: { cursor: endCursor } });
  }, [hasNextPage, fetchMore, endCursor]);

  useBottomScrollListener(() => {
    if (guildPosts && !loading) loadMorePosts();
  });

  if (loading) return <Loading />;
  if (nodes.length === 0) return <>No posts</>;

  return (
    <Stack spacing="lg">
      {nodes.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Stack>
  );
}
