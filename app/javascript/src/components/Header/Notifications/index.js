import React, { useCallback, useMemo } from "react";
import * as Sentry from "@sentry/react";
import SimpleBar from "simplebar-react";
import Loading from "src/components/Loading";
import useViewer from "src/hooks/useViewer";
import { Box, Text, Stack } from "@advisable/donut";
import { Bell } from "@styled-icons/heroicons-outline";
import NotificationIllustration from "src/illustrations/zest/notification";
import Popover, { usePopoverState } from "../Popover";
import { useNotifications, useUpdateLastRead } from "./queries";
import HeaderButton from "../HeaderButton";
import Notification from "./Notification";

// const Notification = ({
//   createdAt,
//   guildPost,
//   specialist,
//   closeNotifications,
//   __typename: type,
// }) => {
//   const messageTypes = {
//     SuggestedPost: "You have a new suggested Post: ",
//   };
//   const message = messageTypes[type];

//   return (
//     </Sentry.ErrorBoundary>
//   );
// };

function NotificationsList({ notifications, popover }) {
  return (
    <>
      <Text
        fontSize="3xl"
        color="neutral90"
        marginBottom={5}
        fontWeight={500}
        letterSpacing="-0.03em"
      >
        Notifications
      </Text>
      <Stack spacing={4}>
        {notifications.map((notification) => {
          return (
            <Sentry.ErrorBoundary key={notification.id} fallback={null}>
              <Notification popover={popover} notification={notification} />
            </Sentry.ErrorBoundary>
          );
        })}
      </Stack>
    </>
  );
}

const Notifications = ({ popover }) => {
  const { data, loading } = useNotifications();
  const notificationItems = data?.notifications?.nodes;

  return (
    <Box width="400px">
      <SimpleBar style={{ maxHeight: "60vh" }}>
        <Box padding={5} display="flex" flexDirection="column">
          {loading ? (
            <Loading />
          ) : notificationItems && notificationItems.length ? (
            <NotificationsList
              popover={popover}
              notifications={notificationItems}
            />
          ) : (
            <Box paddingY={4} textAlign="center">
              <NotificationIllustration
                width="120px"
                className="mx-auto"
                color="var(--color-neutral100)"
              />
              <Text marginTop={4} size="m" fontWeight="500" color="neutral900">
                You have no notifications
              </Text>
            </Box>
          )}
        </Box>
      </SimpleBar>
    </Box>
  );
};

export default function NotificationsMenu() {
  const viewer = useViewer();
  const popover = usePopoverState();
  const [updateLastReadNotification] = useUpdateLastRead();
  const hasUnread = useMemo(() => viewer.unreadNotifications, [viewer]);

  const handleOpen = useCallback(() => {
    if (hasUnread) updateLastReadNotification();
  }, [updateLastReadNotification, hasUnread]);

  return (
    <Popover
      state={popover}
      label="Notifications"
      onOpen={handleOpen}
      disclosure={
        <HeaderButton
          icon={Bell}
          data-testid={hasUnread ? "unreadNotifications" : "notifications"}
          prompt={hasUnread}
        />
      }
    >
      {popover.visible && <Notifications popover={popover} />}
    </Popover>
  );
}
