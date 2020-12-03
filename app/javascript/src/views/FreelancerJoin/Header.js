import React from "react";
import { Link, Box } from "@advisable/donut";
import AdvisableLogo from "./AdvisableLogo";

export default function Header() {
  return (
    <Box gridArea="header" alignSelf="end">
      <Link.External href="https://advisable.com/">
        <AdvisableLogo alt="Advisable logo" />
      </Link.External>
    </Box>
  );
}
