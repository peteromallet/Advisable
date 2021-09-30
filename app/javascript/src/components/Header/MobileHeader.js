// Renders the primary header for the app
import React from "react";
import { X } from "@styled-icons/feather/X";
import { StyledHeader, Hamburger, CloseNav } from "./styles";
import { Box } from "@advisable/donut";
import useLogoURL from "../ApplicationProvider/useLogoURL";
import LogoMark from "src/components/LogoMark";
import Notifications from "./Notifications";
import Navigation from "./Navigation";

export default function MobileHeader() {
  const [navOpen, setNavOpen] = React.useState(false);
  const logoURL = useLogoURL();

  return (
    <StyledHeader justifyContent="space-between">
      <Box>
        <Hamburger onClick={() => setNavOpen(true)}>
          <div />
          <div />
          <div />
        </Hamburger>
        {navOpen && (
          <Box
            top="0"
            left="0"
            right="0"
            bottom="0"
            bg="white"
            zIndex={2}
            padding={5}
            position="fixed"
          >
            <CloseNav onClick={() => setNavOpen(false)}>
              <X />
            </CloseNav>

            <Navigation />
          </Box>
        )}
      </Box>
      <Box>
        <a href={logoURL}>
          <LogoMark size={24} />
        </a>
      </Box>
      <Box>
        <Notifications />
      </Box>
    </StyledHeader>
  );
}
