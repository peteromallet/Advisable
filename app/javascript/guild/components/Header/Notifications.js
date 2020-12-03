import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Notifications as NotificationIcon } from "@styled-icons/ionicons-outline";
import { NavIcon, StyledCurrentUserMenu } from "./styles";
import { GUILD_LAST_READ_QUERY } from "./queries";
import { GUILD_UPDATE_LAST_READ } from "./mutations";
import Notifications from "@guild/components/Notifications";
import { usePopoverState, Popover, PopoverDisclosure } from "reakit/Popover";

export default function NotificationsMenu({ hasUnread }) {
  const popover = usePopoverState({
    placement: "top-end",
  });

  const [guildUpdateLastRead] = useMutation(GUILD_UPDATE_LAST_READ, {
    update(cache, { data }) {
      const { guildUpdateLastRead } = data;
      cache.writeQuery({
        query: GUILD_LAST_READ_QUERY,
        data: { ...guildUpdateLastRead },
      });
    },
  });

  useEffect(() => {
    if (popover.visible && hasUnread) {
      guildUpdateLastRead({
        variables: {
          input: {
            readNotifications: true,
          },
        },
      });
    }
  }, [hasUnread, popover.visible, guildUpdateLastRead]);

  return (
    <>
      <PopoverDisclosure {...popover}>
        {(props) => (
          <NavIcon {...props} unread={hasUnread}>
            <NotificationIcon />
          </NavIcon>
        )}
      </PopoverDisclosure>
      <Popover {...popover} aria-label="Notifications">
        {(props) => (
          <StyledCurrentUserMenu
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
          </StyledCurrentUserMenu>
        )}
      </Popover>
      {/* <Notifications /> */}
    </>
  );
}
