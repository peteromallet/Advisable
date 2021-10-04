import React, { useEffect } from "react";
import { GUILD_NOTIFICATIONS_QUERY, GUILD_UPDATE_LAST_READ } from "./queries";
import truncate from "lodash/truncate";
import { useQuery, useMutation } from "@apollo/client";
import * as Sentry from "@sentry/react";
import Loading from "@advisable-main/components/Loading";
import useViewer from "src/hooks/useViewer";
import { Box, Avatar, Text, Link, Stack } from "@advisable/donut";
import { StyledNotificationsButton, NotificationItem } from "./styles";
import { GuildBox } from "@guild/styles";
import { relativeDate } from "@guild/utils";
import { Bell } from "@styled-icons/heroicons-outline";
import { usePopoverState, Popover, PopoverDisclosure } from "reakit/Popover";

const AuthorDetails = ({ author }) => (
  <GuildBox flexCenterBoth spaceChildrenVertical={8}>
    <Avatar size="s" name={author.name} url={author.avatar} />
  </GuildBox>
);

const Notification = ({
  createdAt,
  guildPost,
  specialist,
  closeNotifications,
  __typename: type,
}) => {
  const messageTypes = {
    PostReactionNotification: " found your post interesting: ",
    SuggestedPostNotification: "You have a new suggested Post: ",
  };
  const message = messageTypes[type];

  return (
    <Sentry.ErrorBoundary fallback={null}>
      <NotificationItem>
        <Box mr={4}>
          <AuthorDetails author={specialist} />
        </Box>
        <Box flex={1}>
          <Text size="s" color="neutral600" mb={1} lineHeight="1.1rem">
            {type === "PostReactionNotification" ? (
              <Link
                to={`/freelancers/${specialist.id}`}
                fontWeight="medium"
                variant="dark"
                onClick={closeNotifications}
              >
                {specialist.name}
              </Link>
            ) : null}

            {message}

            <Link
              to={`/guild/posts/${guildPost?.id}`}
              fontWeight="medium"
              variant="dark"
              onClick={closeNotifications}
            >
              {truncate(guildPost?.title, { length: 100 })}
            </Link>
          </Text>
          <Text
            fontSize="xxs"
            fontWeight="light"
            letterSpacing="-0.01em"
            color="darkGrey"
          >
            {relativeDate(createdAt)}
          </Text>
        </Box>
      </NotificationItem>
    </Sentry.ErrorBoundary>
  );
};

function NotificationsList({ notifications, closeNotifications }) {
  return (
    <Stack spacing={4}>
      {notifications.map((notification, key) => {
        return (
          <Notification
            key={key}
            closeNotifications={closeNotifications}
            {...notification}
          />
        );
      })}
    </Stack>
  );
}

const Notifications = ({ open, closeNotifications }) => {
  const { data, loading, refetch } = useQuery(GUILD_NOTIFICATIONS_QUERY, {
    fetchPolicy: "cache-and-network",
    skip: !open,
  });
  const notificationItems = data?.guildNotifications?.nodes;

  useEffect(() => {
    if (open) {
      refetch();
    }
  }, [refetch, open]);

  return (
    <Box py={4} px={6} display="flex" flexDirection="column">
      <Text
        fontSize="3xl"
        color="blue900"
        marginBottom={4}
        fontWeight="medium"
        letterSpacing="-0.02rem"
      >
        Notifications
      </Text>
      {loading ? (
        <Loading />
      ) : notificationItems && notificationItems.length ? (
        <NotificationsList
          closeNotifications={closeNotifications}
          notifications={notificationItems}
        />
      ) : (
        <NotificationItem pb="l" alignItems="center" justifyContent="center">
          <Text size="m" fontWeight="500" color="catalinaBlue100">
            {"No Notifications"}
          </Text>
        </NotificationItem>
      )}
    </Box>
  );
};

export default function NotificationsMenu() {
  const viewer = useViewer();
  const hasUnread = viewer.guildUnreadNotifications;
  const popover = usePopoverState({
    placement: "top-end",
  });

  const [guildUpdateLastRead] = useMutation(GUILD_UPDATE_LAST_READ);

  useEffect(() => {
    if (popover.visible && hasUnread) {
      guildUpdateLastRead();
    }
  }, [hasUnread, popover.visible, guildUpdateLastRead]);

  return (
    <>
      <PopoverDisclosure {...popover}>
        {(props) => (
          <StyledNotificationsButton
            {...props}
            color="white"
            data-testid={hasUnread ? "unreadNotifications" : "notifications"}
          >
            <Bell size={24} />
          </StyledNotificationsButton>
        )}
      </PopoverDisclosure>
      <Popover {...popover} aria-label="Notifications">
        {(props) => (
          <Box
            maxHeight="50vh"
            width="80%"
            maxWidth="400px"
            tabIndex={0}
            {...props}
          >
            <Notifications
              open={popover.visible}
              closeNotifications={popover.hide}
            />
          </Box>
        )}
      </Popover>
    </>
  );
}
