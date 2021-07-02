import React from "react";
import { Link, Box } from "@advisable/donut";
import Logo from "src/components/Logo";

export default function Header() {
  return (
    <Box gridArea="header" alignSelf="end">
      <Link.External href="https://advisable.com/">
        <Logo color="white" />
      </Link.External>
    </Box>
  );
}
