// Renders the primary header for the app
import React from "react";
import { X } from "@styled-icons/feather/X";
import { Hamburger, CloseNav } from "./styles";
import { Box } from "@advisable/donut";
import HeaderLogo from "src/components/HeaderLogo";
import Notifications from "./Notifications";
import Navigation from "./Navigation";
import useViewer from "src/hooks/useViewer";
import HeaderBar from "./HeaderBar";

export default function MobileHeader() {
  const viewer = useViewer();
  const [navOpen, setNavOpen] = React.useState(false);

  const handleCloseNav = () => {
    return setNavOpen(false);
  };

  return (
    <HeaderBar className="justify-between">
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
        <HeaderLogo />
      </Box>
      <Box>{viewer?.isSpecialist && <Notifications />}</Box>
    </HeaderBar>
  );
}
