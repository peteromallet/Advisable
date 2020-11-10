import React from "react";
import { rgba } from "polished";
import styled from "styled-components";
import { useQuery, useMutation } from "@apollo/client";
import { useHistory, useLocation } from "react-router-dom";
import { theme, Box, Link } from "@advisable/donut";
import logo from "@advisable-main/components/Header/logo";
import { useToggle } from "@guild/hooks/useToggle";
import { Notification, Messages, Menu } from "@guild/icons";
import Notifications from "@guild/components/Notifications";
import UserMenu from "@guild/components/UserMenu";
import { NavIcon } from "./styles";
import { GuildBox } from "@guild/styles";
import { GUILD_LAST_READ_QUERY } from "./queries";
import { GUILD_UPDATE_LAST_READ } from "./mutations";

const StyledHeader = styled(Box)`
  z-index: 5;
  height: 58px;
  width: 100%;
  color: white;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 2px ${rgba(theme.colors.neutral900, 0.2)};
`;

const Header = () => {
  const location = useLocation();
  const [notificationsOpen, toggleNotifications] = useToggle();
  const [userMenuOpen, toggleUserMenu] = useToggle();
  const history = useHistory();

  const { data: lastReadData } = useQuery(GUILD_LAST_READ_QUERY, {
    pollInterval: 2500,
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

  const handleMessages = () => {
    history.push("/messages");
  };

  const handleNotifications = () => {
    toggleNotifications();
    safeToggleNav();
    handleUpdateLastRead({ readNotifications: true });
  };

  const handleUserMenu = () => {
    toggleUserMenu();
    safeToggleNav();
  };

  const safeToggleNav = React.useCallback(() => {
    if (notificationsOpen) toggleNotifications();
    if (userMenuOpen) toggleUserMenu();
  }, [notificationsOpen, userMenuOpen]);

  const handleUpdateLastRead = async (input) =>
    await guildUpdateLastRead({ variables: { input } });

  const messagesOpen = location.pathname.match(/messages(?:.*)/);

  return (
    <>
      <Notifications open={notificationsOpen} />
      <UserMenu open={userMenuOpen} />
      <StyledHeader bg="slateBlue" px="lg">
        <Box display="flex">
          <Link to={"/"}>
            <img src={logo} alt="" />
          </Link>
        </Box>

        <GuildBox spaceChildrenHorizontal={24} display="flex">
          <NavIcon
            unread={lastReadData?.viewer?.guildUnreadMessages && !messagesOpen}
            onClick={handleMessages}
            open={messagesOpen}
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
          <NavIcon onClick={handleUserMenu} open={userMenuOpen}>
            <Menu />
          </NavIcon>
        </GuildBox>
      </StyledHeader>
      <Box height="58px" />
      {/* <Mask isOpen={maskOpen} toggler={safeToggleMask} /> */}
    </>
  );
};

export default Header;
