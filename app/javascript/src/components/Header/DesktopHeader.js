import React from "react";
import { StyledHeader, StyledHeaderSpacer } from "./styles";
import CurrentUser from "./CurrentUser";
import { Box } from "@advisable/donut";
import useLogoURL from "../ApplicationProvider/useLogoURL";
import useViewer from "src/hooks/useViewer";
import LogoMark from "src/components/LogoMark";
import Notifications from "./Notifications";
import Navigation from "./Navigation";
import NavigationLink from "./NavigationLink";

export default function DesktopHeader() {
  const viewer = useViewer();
  const logoURL = useLogoURL();

  return (
    <>
      <StyledHeader>
        <a href={logoURL}>
          <LogoMark size={24} />
        </a>
        <Box flexGrow={1}>
          <Navigation />
        </Box>
        <Box display="flex" alignItems="center" css="gap: 12px;">
          {viewer?.isSpecialist && <Notifications />}
          {viewer ? (
            <CurrentUser />
          ) : (
            <NavigationLink to="/login">Login</NavigationLink>
          )}
        </Box>
      </StyledHeader>
      <StyledHeaderSpacer />
    </>
  );
}
