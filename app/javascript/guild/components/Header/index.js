import React, { useState, useCallback } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Box, Link, useBreakpoint } from "@advisable/donut";
import logo from "@advisable-main/components/Header/logo";
import { useToggle } from "@guild/hooks/useToggle";
import Notification from "@guild/icons/Notification";
import Messages from "@guild/icons/Messages";
import SearchBar from "@guild/components/SearchBar";
import Notifications from "@guild/components/Notifications";
import { NavIcon, Mask } from "./styles";
import { GuildBox } from "@guild/styles";
import { GUILD_LAST_READ_QUERY } from "./queries";
import { GUILD_UPDATE_LAST_READ } from "./mutations";
import { pick } from "lodash-es";

const Header = () => {
  const sUp = useBreakpoint("sUp");
  const [notificationsOpen, toggleNotifications] = useToggle();
  const [maskOpen, toggleMask] = useToggle();

  const { data: lastReadData } = useQuery(GUILD_LAST_READ_QUERY, {
    pollInterval: 5000,
  });

  const [guildUpdateLastRead] = useMutation(GUILD_UPDATE_LAST_READ, {
    update(cache, { data }) {
      const { guildUpdateLastRead } = data;
      const newLastReadData = pick(
        guildUpdateLastRead,
        "guildUnreadMessages",
        "guildUnreadNotifications",
      );
      cache.writeQuery({
        query: GUILD_LAST_READ_QUERY,
        data: { viewer: { __typename: "Specialist", ...newLastReadData } },
      });
    },
  });

  const handleMessages = () => {
    if (maskOpen) safeToggleMask();
    // handleUpdateLastRead({ readMessages: true });
    // TODO: navigate to /messages ...
  };

  const handleNotifications = () => {
    safeToggleMask();
    toggleNotifications();
    handleUpdateLastRead({ readNotifications: true });
  };

  const safeToggleMask = () => {
    if (notificationsOpen) toggleNotifications();
    toggleMask();
  };

  const handleUpdateLastRead = (input) =>
    guildUpdateLastRead({ variables: { input } });

  return (
    <>
      <Notifications open={notificationsOpen} />
      <Box
        height="58px"
        width="100%"
        color="white.9"
        px="l"
        bg="slateBlue"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex">
          {sUp && (
            <Link to={"/"}>
              <img src={logo} alt="" />
            </Link>
          )}
          <SearchBar handleSubmitSearch={null} />
        </Box>

        {sUp && (
          <GuildBox spaceChildrenHorizontal={24} display="flex">
            {/* 
              TODO: preload query 
                https://www.apollographql.com/docs/react/performance/performance/
            */}
            <NavIcon
              unread={lastReadData?.viewer?.guildUnreadMessages}
              onClick={handleMessages}
            >
              <Messages />
            </NavIcon>
            <NavIcon
              unread={lastReadData?.viewer?.guildUnreadNotifications}
              open={notificationsOpen}
              onClick={handleNotifications}
            >
              <Notification />
            </NavIcon>
          </GuildBox>
        )}
      </Box>
      <Mask open={maskOpen} onClick={safeToggleMask} />
    </>
  );
};

export default Header;
