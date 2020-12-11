import React, { useState, useEffect } from "react";
import { Text, Tooltip } from "@advisable/donut";
import { lowerDashed } from "@guild/utils";
import useFollows from "@guild/views/Follows/useFollows";
import { css } from "styled-components";
import { useNotifications } from "@advisable-main/components/Notifications";

const Topic = ({ topic }) => {
  const { followTopic, unfollowTopic, followedTopics } = useFollows();

  const [followed, setFollowed] = useState(false);
  const notifications = useNotifications();

  const onChangeFollow = async (topic) => {
    setFollowed(!followed);
    followed ? await unfollowTopic(topic.id) : await followTopic(topic.id);
    notifications.notify(
      `${followed ? "Unfollowed" : "Followed"}: ${topic.name}`,
    );
  };

  useEffect(() => {
    const isFollowed = followedTopics?.some((t) => t.id === topic.id);
    setFollowed(isFollowed);
  }, [followedTopics]);

  return (
    <Tooltip
      placement="top"
      content={`${followed ? "Unfollow" : "Follow"} topic`}
    >
      <Text
        onClick={() => onChangeFollow(topic)}
        fontSize="s"
        fontWeight="medium"
        color={followed ? "nuetral900" : "neutral400"}
        css={css`
          outline: none;
          &:hover {
            cursor: pointer;
          }
        `}
      >
        #{lowerDashed(topic.name)}
      </Text>
    </Tooltip>
  );
};

export default Topic;
