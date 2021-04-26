import React, { useState, useEffect } from "react";
import { ArrowBack } from "@styled-icons/ionicons-outline/ArrowBack";
import { MinusCircle } from "@styled-icons/heroicons-outline/MinusCircle";
import { Plus } from "@styled-icons/heroicons-outline/Plus";
import { Box, Text, Link, Button, Card } from "@advisable/donut";
import useFollows from "@guild/views/Follows/useFollows";
import { GuildBox } from "@guild/styles";

const FollowTopic = ({ topicId }) => {
  const [followed, setFollowed] = useState(false);
  const { followTopic, unfollowTopic, followedTopics } = useFollows();

  const onChangeFollow = async () => {
    setFollowed(!followed);
    followed ? await unfollowTopic(topicId) : await followTopic(topicId);
  };

  useEffect(() => {
    const isFollowed = followedTopics?.some((t) => t.slug === topicId);
    setFollowed(isFollowed);
  }, [followedTopics, topicId]);

  return (
    <Box marginBottom="lg">
      <Link to={"/feed"}>
        <Button
          prefix={<ArrowBack />}
          size="xs"
          variant="minimal"
          marginBottom="12px"
        >
          Back to Feed
        </Button>
      </Link>
      <Card padding="m" borderRadius="12px">
        <GuildBox flexCenterBoth flexSpaceBetween>
          <Text fontWeight="500" size="l">
            #{topicId}
          </Text>
          <Button
            prefix={followed ? <MinusCircle /> : <Plus />}
            size="s"
            variant="primary"
            onClick={onChangeFollow}
          >
            {followed ? "Unfollow" : "Follow"}
          </Button>
        </GuildBox>
      </Card>
    </Box>
  );
};

export default FollowTopic;
