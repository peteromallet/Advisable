import React from "react";
import { StyledHeader, StyledHeaderSpacer } from "./styles";
import { Box } from "@advisable/donut";
import NavigationLink from "./NavigationLink";
import Logo from "../Logo";

export default function PublicHeader() {
  return (
    <>
      <StyledHeader>
        <div className="w-full flex justify-between items-center">
          <a href="/">
            <Logo height={20} />
          </a>
          <Box display="flex" alignItems="center" css="gap: 12px;">
            <NavigationLink to="/login">Login</NavigationLink>
          </Box>
        </div>
      </StyledHeader>
      <StyledHeaderSpacer />
    </>
  );
}
