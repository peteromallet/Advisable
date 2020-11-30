import React from "react";
import { Home, Chat } from "@styled-icons/heroicons-solid";
import { useQuery, useMutation } from "@apollo/client";
import { NavLink, Link } from "react-router-dom";
import { Box } from "@advisable/donut";
import logo from "@advisable-main/components/Header/logo.svg";
import { useToggle } from "@guild/hooks/useToggle";
import { Notification, Menu } from "@guild/icons";
import Notifications from "@guild/components/Notifications";
import UserMenu from "@guild/components/UserMenu";
import {
  StyledHeader,
  StyledHeaderLink,
  StyledHeaderBadge,
  NavIcon,
} from "./styles";
import { GuildBox } from "@guild/styles";
import { GUILD_LAST_READ_QUERY } from "./queries";
import { GUILD_UPDATE_LAST_READ } from "./mutations";

const TWO_MINUTES = 120000;

const Header = () => {
  const [notificationsOpen, toggleNotifications] = useToggle();
  const [userMenuOpen, toggleUserMenu] = useToggle();

  const { data: lastReadData } = useQuery(GUILD_LAST_READ_QUERY, {
    pollInterval: TWO_MINUTES,
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
  }, [toggleNotifications, toggleUserMenu, notificationsOpen, userMenuOpen]);

  const handleUpdateLastRead = async (input) =>
    await guildUpdateLastRead({ variables: { input } });

  const unreadMessages = lastReadData?.viewer?.guildUnreadMessages;

  return (
    <>
      <Notifications open={notificationsOpen} />
      <UserMenu open={userMenuOpen} onToggle={toggleUserMenu} />
      <StyledHeader px="lg">
        <Box display="flex" alignItems="center">
          <Box mr={8}>
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </Box>

          <nav>
            <StyledHeaderLink as={NavLink} to="/feed">
              <Home />
              Feed
            </StyledHeaderLink>
            <StyledHeaderLink as={NavLink} to="/messages">
              <Chat />
              {unreadMessages ? (
                <StyledHeaderBadge top="4px" left="32px" />
              ) : null}
              Messages
            </StyledHeaderLink>
          </nav>
        </Box>

        <GuildBox spaceChildrenHorizontal={24} display="flex">
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
