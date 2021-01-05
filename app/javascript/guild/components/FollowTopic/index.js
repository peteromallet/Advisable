import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ArrowBack } from "@styled-icons/ionicons-outline";
import { Plus, MinusCircle } from "@styled-icons/heroicons-outline";
import { Box, Text, Link, Button, Card } from "@advisable/donut";
import { GUILD_TOPIC_QUERY } from "./queries";
import useFollows from "@guild/views/Follows/useFollows";
import { GuildBox } from "@guild/styles";

const FollowTopic = ({ topicId }) => {
  const { data } = useQuery(GUILD_TOPIC_QUERY, {
    variables: { id: topicId },
  });
  const guildTopic = data?.guildTopic;

  const { followTopic, unfollowTopic, followedTopics } = useFollows();

  const [followed, setFollowed] = useState(false);

  const onChangeFollow = async () => {
    setFollowed(!followed);
    followed ? await unfollowTopic(topicId) : await followTopic(topicId);
  };

  useEffect(() => {
    const isFollowed = followedTopics?.some((t) => t.id === topicId);
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
            #{guildTopic?.name}
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
