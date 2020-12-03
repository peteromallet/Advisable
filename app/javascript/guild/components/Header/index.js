import React, { useState } from "react";
import { Home, Chat } from "@styled-icons/heroicons-solid";
import { useQuery } from "@apollo/client";
import { NavLink, Link } from "react-router-dom";
import { Box } from "@advisable/donut";
import logo from "@advisable-main/components/Header/logo.svg";
import CurrentUser from "./CurrentUser";
import MobileNavigation from "./MobileNavigation";
import {
  StyledHeader,
  StyledHeaderLink,
  StyledHeaderBadge,
  StyledHamburger,
} from "./styles";
import { GUILD_LAST_READ_QUERY } from "./queries";
import Notifications from "./Notifications";

const TWO_MINUTES = 120000;

const Header = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const { data: lastReadData } = useQuery(GUILD_LAST_READ_QUERY, {
    pollInterval: TWO_MINUTES,
  });

  const unreadMessages = lastReadData?.viewer?.guildUnreadMessages;
  const hasUnreadNotifications = lastReadData?.viewer?.guildUnreadNotifications;

  return (
    <>
      <StyledHeader px="lg">
        <Box display="flex" alignItems="center">
          <Box display={{ _: "block", m: "none" }}>
            <StyledHamburger onClick={() => setMobileNavOpen(true)}>
              <div />
              <div />
              <div />
            </StyledHamburger>
          </Box>

          <Box mt="-2px" mr={8}>
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </Box>

          <MobileNavigation
            mobileNavOpen={mobileNavOpen}
            setMobileNavOpen={setMobileNavOpen}
          />

          <Box as="nav" display={{ _: "none", m: "block" }}>
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
          </Box>
        </Box>

        <Box display="flex" alignItems="center">
          <Box mr={4}>
            <Notifications hasUnread={hasUnreadNotifications} />
          </Box>
          <CurrentUser />
        </Box>
      </StyledHeader>
      <Box height="58px" />
      {/* <Mask isOpen={maskOpen} toggler={safeToggleMask} /> */}
    </>
  );
};

export default Header;
