import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { Stack } from "@advisable/donut";
import Post from "@guild/components/Post";
import { useScrolledToBottom } from "@guild/hooks/useScrolledToBottom";
import { useGuildPosts } from "../queries";
import Loading from "./Loading";

export default function GuildProfilePosts() {
  const { id } = useParams();
  const { bottomReached } = useScrolledToBottom();
  const { data, loading, fetchMore } = useGuildPosts({
    variables: {
      id,
    },
  });

  const posts = data?.specialist.guildPosts;
  const endCursor = posts?.pageInfo.endCursor;

  const loadMorePosts = useCallback(async () => {
    fetchMore({
      variables: {
        cursor: endCursor,
      },
    });
  }, [fetchMore, endCursor]);

  useEffect(() => {
    if (bottomReached && posts) loadMorePosts();
  }, [bottomReached, loadMorePosts, posts]);

  if (loading) return <Loading />;

  if (posts.length === 0) return <>No posts</>;

  return (
    <Stack spacing="lg">
      {posts.nodes.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Stack>
  );
}
