import React from "react";
import { GUILD_NOTIFICATIONS_QUERY } from "./queries";
import { truncate } from "lodash-es";
import { useQuery } from "@apollo/client";
import Loading from "@advisable-main/components/Loading";
import { Box, Avatar, Text, Link } from "@advisable/donut";
import {
  NotificationDropdown,
  NotificationItem,
  CommentNotificationBody,
} from "./styles";
import { GuildBox } from "@guild/styles";

const Notifications = ({ open }) => {
  const { data, loading } = useQuery(GUILD_NOTIFICATIONS_QUERY, {
    fetchPolicy: "cache-and-network",
    skip: !open,
  });
  const notificationItems = data?.guildActivity?.nodes;

  return (
    <NotificationDropdown display="flex" flexDirection="column" open={open}>
      <Text
        fontSize="xxl"
        fontWeight="light"
        letterSpacing="-0.01%"
        lineHeight="24px"
        color="catalinaBlue100"
      >
        Notifications
      </Text>
      {loading ? (
        <Loading />
      ) : notificationItems && notificationItems.length ? (
        notificationItems.map((notification, key) => (
          <NotificationItem key={key}>
            {notification.__typename === "GuildComment" ? (
              <CommentNotification {...notification} />
            ) : (
              <ReactionNotification {...notification} />
            )}
          </NotificationItem>
        ))
      ) : (
        <NotificationItem alignItems="center" justifyContent="center">
          <Text size="l" color="catalinaBlue100">
            {"No Notifications"}
          </Text>
        </NotificationItem>
      )}
    </NotificationDropdown>
  );
};

const AuthorDetails = ({ authorName, createdAt }) => (
  <GuildBox alignItems="center" spaceChildrenVertical={4}>
    <Text
      fontSize="xs"
      fontWeight="light"
      letterSpacing="-0.01em"
      color="quartz"
    >
      {truncate(authorName, { length: 12 })}
    </Text>
    <Text
      fontSize="xxs"
      fontWeight="light"
      letterSpacing="-0.01em"
      color="darkGrey"
      textAlign="center"
    >
      {createdAt} ago
    </Text>
  </GuildBox>
);

const CommentNotification = ({ author, post, body, id, createdAtTimeAgo }) => (
  <>
    <GuildBox
      width="87px"
      backgroundColor="ghostWhite"
      spaceChildrenVertical={4}
      flexCenterBoth
    >
      <Avatar size="s" name={author.name} url={author.avatar} />
      <AuthorDetails authorName={author.name} createdAt={createdAtTimeAgo} />
    </GuildBox>

    <Box
      as={Link}
      to={`/posts/${post.id}#comments`}
      width="305px"
      height="116px"
      px="24px"
      backgroundColor="aliceBlue"
    >
      <CommentNotificationBody
        text={`commented, "${body}"`}
        id={id}
        lines={3}
        ellipsis="..."
        className="comment-notification"
        innerElement="p"
        buttons={false}
      />
    </Box>
  </>
);

const ReactionNotification = ({
  author,
  kind,
  reactionable,
  createdAtTimeAgo,
}) => (
  <Box height="54px" display="flex">
    <GuildBox
      width="87px"
      flexDirection="column"
      backgroundColor="ghostWhite"
      flexCenterBoth
    >
      <AuthorDetails authorName={author.name} createdAt={createdAtTimeAgo} />
    </GuildBox>
    <Box
      as={Link}
      pl="24px"
      width="305px"
      backgroundColor="aliceBlue"
      display="flex"
      alignItems="center"
      to={`/posts/${reactionable?.id}`}
    >
      <Text size="xs" color="catalinaBlue100">
        {`Reacted to your Post with: ${kind}`}
      </Text>
    </Box>
  </Box>
);

export default Notifications;
