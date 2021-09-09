import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Notifications as NotificationIcon } from "@styled-icons/ionicons-outline/Notifications";
import { NavIcon, StyledCurrentUserMenu } from "./styles";
import { GUILD_UPDATE_LAST_READ } from "./mutations";
import Notifications from "@guild/components/Notifications";
import { usePopoverState, Popover, PopoverDisclosure } from "reakit/Popover";

export default function NotificationsMenu({ hasUnread }) {
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
          <NavIcon
            {...props}
            unread={hasUnread}
            data-testid={hasUnread ? "unreadNotifications" : "notifications"}
          >
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
    </>
  );
}
