// Renders the primary header for the app
import React from "react";
import { X } from "@styled-icons/feather/X";
import {
  StyledHeader,
  StyledHeaderSpacer,
  Hamburger,
  CloseNav,
} from "./styles";
import { Box } from "@advisable/donut";
import useLogoURL from "../ApplicationProvider/useLogoURL";
import LogoMark from "src/components/LogoMark";
import Notifications from "./Notifications";
import Navigation from "./Navigation";
import useViewer from "src/hooks/useViewer";

export default function MobileHeader() {
  const viewer = useViewer();
  const [navOpen, setNavOpen] = React.useState(false);
  const logoURL = useLogoURL();

  const handleCloseNav = () => {
    return setNavOpen(false);
  };

  return (
    <>
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

              <Navigation isMobile closeNav={handleCloseNav} />
            </Box>
          )}
        </Box>
        <Box>
          <a href={logoURL}>
            <LogoMark size={24} />
          </a>
        </Box>
        <Box>{viewer?.isSpecialist && <Notifications />}</Box>
      </StyledHeader>
      <StyledHeaderSpacer />
    </>
  );
}
