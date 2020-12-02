import React from "react";
import { Link, Text, Box } from "@advisable/donut";

function Footer() {
  return (
    <Box display="flex" position="relative" pt={6} mt={{ _: "auto", xl: 0 }}>
      <Text
        fontWeight="medium"
        color={{ xl: "blue900", _: "neutral500" }}
        mr="xs"
        ml={{ _: "auto", xl: 0 }}
      >
        &#169; Advisable
      </Text>
      <Text mr="xs" color={{ _: "neutral500", xl: "blue900" }}>
        •
      </Text>
      <Link.External
        to="/"
        color={{ xl: "blue900", _: "neutral500" }}
        mr={{ _: "auto", xl: 0 }}
      >
        Privacy & Terms
      </Link.External>
    </Box>
  );
}

export default Footer;
