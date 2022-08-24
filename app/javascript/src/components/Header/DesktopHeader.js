import React from "react";
import { StyledHeader, StyledHeaderSpacer } from "./styles";
import CurrentUser from "./CurrentUser";
import { Box } from "@advisable/donut";
import HeaderLogo from "src/components/HeaderLogo";
import MessagesDropdown from "./MessagesDropdown";
import Notifications from "./Notifications";
import Navigation from "./Navigation";

export default function DesktopHeader() {
  return (
    <>
      <StyledHeader>
        <HeaderLogo />
        <Box flexGrow={1}>
          <Navigation />
        </Box>
        <div className="hidden flex-1 gap-3 justify-end items-center ml-auto md:flex">
          <MessagesDropdown />
          <Notifications />
          <CurrentUser />
        </div>
      </StyledHeader>
      <StyledHeaderSpacer />
    </>
  );
}
