import React from "react";
import { useHistory } from "react-router-dom";
import { Text, Card, Button, Stack, Link, Box } from "@advisable/donut";
import Loading from "@advisable-main/components/Loading";
import LabelPost from "./LabelPost";

export default function StoryBox({ loading, latestPrompt }) {
  const history = useHistory();
  const label = latestPrompt?.label;
  const posts = label?.guildPosts?.edges?.map((e) => e.node) || [];

  const handleViewAll = () => history.push(`/topics/${label.slug}`);
  const handleCreateFromPrompt = () =>
    history.push(`/composer/prompt/${latestPrompt.id}`);

  if (loading) return <Loading />;

  return label && posts ? (
    <Card padding={4} elevation="s" marginBottom={8} borderRadius="12px">
      <Text
        fontSize="xl"
        fontWeight="500"
        marginBottom={2}
        color="neutral900"
        letterSpacing="-0.024rem"
      >
        #{label.slug}
      </Text>
      <Text fontSize="sm" lineHeight="16px" color="neutral800" fontWeight="400">
        {latestPrompt.description}
      </Text>

      <Stack spacing="md" marginTop={5} marginBottom={6} divider="neutral100">
        {posts.map((post) => (
          <LabelPost key={post.id} post={post} />
        ))}
      </Stack>

      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <Button
          size="s"
          width="100%"
          marginBottom={3}
          aria-label={`create a post for ${label.slug}`}
          onClick={handleCreateFromPrompt}
        >
          {latestPrompt.cta}
        </Button>
        <Link
          fontSize="s"
          width="100%"
          aria-label="view all"
          onClick={handleViewAll}
        >
          View all
        </Link>
      </Box>
    </Card>
  ) : null;
}
