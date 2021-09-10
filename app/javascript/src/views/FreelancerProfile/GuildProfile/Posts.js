import React, { useCallback } from "react";
import { useParams } from "react-router";
import { Stack, Box } from "@advisable/donut";
import Post from "guild/components/Post";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { useGuildPosts } from "../queries";
import Loading from "./Loading";
import NoPosts from "./NoPosts";
import {
  SectionHeaderText,
  SectionHeaderWrapper,
} from "../components/SectionHeader";

export default function GuildProfilePosts({ specialist }) {
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
  if (nodes.length === 0) return <NoPosts specialist={specialist} />;

  return (
    <Box mb="4xl">
      <SectionHeaderWrapper>
        <SectionHeaderText>Posts</SectionHeaderText>
      </SectionHeaderWrapper>
      <Stack spacing="lg">
        {nodes.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </Stack>
    </Box>
  );
}
