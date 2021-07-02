import React, { useState } from "react";
import { Chat } from "@styled-icons/heroicons-solid/Chat";
import { Home } from "@styled-icons/heroicons-solid/Home";
import { Calendar } from "@styled-icons/heroicons-outline/Calendar";
import { useQuery } from "@apollo/client";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Box, useBreakpoint } from "@advisable/donut";
import CurrentUser from "./CurrentUser";
import MobileNavigation from "./MobileNavigation";
import useViewer from "src/hooks/useViewer";
import GuildToggle from "src/components/GuildToggle";
import LogoMark from "src/components/LogoMark";
import {
  StyledHeader,
  StyledHeaderLink,
  StyledHeaderBadge,
  StyledHeaderBadgeNumber,
  StyledHamburger,
} from "./styles";
import { GUILD_LAST_READ_QUERY } from "./queries";
import { EVENTS_QUERY } from "@guild/views/Events/queries";
import Notifications from "./Notifications";
import { useTwilioChat } from "../TwilioProvider";

const TWO_MINUTES = 120000;

const Header = () => {
  const viewer = useViewer();
  const location = useLocation();
  const isLargeScreen = useBreakpoint("mUp");
  const { unreadMessages } = useTwilioChat();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const path = encodeURIComponent(`/guild${location.pathname}`);

  const { data: lastReadData } = useQuery(GUILD_LAST_READ_QUERY, {
    pollInterval: TWO_MINUTES,
    skip: !viewer,
  });
  const hasUnreadNotifications = lastReadData?.viewer?.guildUnreadNotifications;

  const { data: eventsData } = useQuery(EVENTS_QUERY, { skip: !viewer });
  const eventsCount = eventsData?.events?.upcomingEventsCount;

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

          <Box mr={4}>
            <Link to="/">
              <LogoMark color="white" size={24} />
            </Link>
          </Box>

          <MobileNavigation
            mobileNavOpen={mobileNavOpen}
            setMobileNavOpen={setMobileNavOpen}
          />

          {viewer ? (
            <Box as="nav" display={{ _: "none", m: "block" }}>
              <StyledHeaderLink
                href="/guild/feed"
                className={location.pathname === "/feed" ? "active" : null}
              >
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
              <StyledHeaderLink exact as={NavLink} to="/events">
                <Calendar />
                {eventsCount ? (
                  <StyledHeaderBadgeNumber
                    top="4px"
                    left="32px"
                    data-testid="upcomingEvents"
                  >
                    {eventsCount}
                  </StyledHeaderBadgeNumber>
                ) : null}
                Events
              </StyledHeaderLink>
            </Box>
          ) : null}
        </Box>

        <Box display="flex" alignItems="center">
          {viewer && isLargeScreen ? (
            <GuildToggle mr={4} url="/">
              Switch to projects
            </GuildToggle>
          ) : null}
          {viewer ? (
            <Box mr={4}>
              <Notifications hasUnread={hasUnreadNotifications} />
            </Box>
          ) : (
            <StyledHeaderLink as="a" href={`/login?redirect=${path}`}>
              Login
            </StyledHeaderLink>
          )}
          <CurrentUser />
        </Box>
      </StyledHeader>
      <Box height="60px" />
    </>
  );
};

export default Header;
