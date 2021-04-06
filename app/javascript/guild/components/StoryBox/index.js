import React from "react";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { STORY_BOX_QUERY } from "./queries";
import { Text, Card, Button, Box } from "@advisable/donut";
import Loading from "@advisable-main/components/Loading";
import LabelPost from "./LabelPost";

export default function StoryBox() {
  const history = useHistory();
  const { data, loading } = useQuery(STORY_BOX_QUERY);
  const latestPrompt = data?.latestPrompt;
  const label = latestPrompt?.label;
  const posts = label?.guildPosts?.edges?.map((e) => e.node) || [];

  console.log(posts);

  const handleViewAll = () => history.push(`/topics/${label.slug}`);
  const handleCreateFromPrompt = () =>
    history.push(`/composer/prompt/${latestPrompt.id}`);

  if (loading) return <Loading />;

  return label && posts ? (
    <Card padding="3" marginBottom="4" borderRadius="12px" background="white">
      <Box marginY="xs">
        <Text marginBottom="m" size="l" color="blue900" fontWeight="medium">
          #{label.slug}
        </Text>
        <Text size="s" color="neutral600" fontWeight="light">
          {latestPrompt.description}
        </Text>
      </Box>

      <Box marginY="l">
        {posts.map((post) => (
          <LabelPost key={post.id} post={post} />
        ))}
      </Box>

      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <Button
          size="s"
          width="100%"
          marginBottom="3"
          aria-label={`create a post for ${label.slug}`}
          onClick={handleCreateFromPrompt}
        >
          {latestPrompt.promptCta}
        </Button>
        <Button
          size="s"
          width="100%"
          variant="subtle"
          aria-label="view all"
          onClick={handleViewAll}
        >
          View all
        </Button>
      </Box>
    </Card>
  ) : null;
}
