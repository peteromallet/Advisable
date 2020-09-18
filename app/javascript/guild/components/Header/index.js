import React from "react";
import { Box, Link, useBreakpoint } from "@advisable/donut";
import logo from "@advisable-main/components/Header/logo";
import { useToggle } from "@guild/hooks/useToggle";
import Notification from "@guild/icons/Notification";
import Messages from "@guild/icons/Messages";
import SearchBar from "@guild/components/SearchBar";
import Notifications from "@guild/components/Notifications";
import { NavIcon, Mask } from "./styles";
import { GuildBox } from "@guild/styles";

const Header = () => {
  const sUp = useBreakpoint("sUp");
  const [notificationsOpen, toggleNotifications] = useToggle();
  const [maskOpen, toggleMask] = useToggle();

  const handleMessages = () => {
    if (maskOpen) safeToggleMask();
    // TODO: navigate to /messages ...
  };

  const handleNotifications = () => {
    safeToggleMask();
    toggleNotifications();
  };

  const safeToggleMask = () => {
    if (notificationsOpen) toggleNotifications();
    toggleMask();
  };

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
            <NavIcon unread onClick={handleMessages}>
              <Messages />
            </NavIcon>
            <NavIcon
              unread
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
