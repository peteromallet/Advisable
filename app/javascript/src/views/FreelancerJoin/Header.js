import React from "react";
import { Link, Box } from "@advisable/donut";
import AdvisableLogo from "./AdvisableLogo";

export default function Header() {
  return (
    <Box width="100%" maxWidth="650px" mx={{ _: "auto", xl: 0 }}>
      <Link.External href="https://advisable.com/">
        <AdvisableLogo alt="Advisable logo" />
      </Link.External>
    </Box>
  );
}
