import React from "react";
import { Link, Text, Box } from "@advisable/donut";

function Footer() {
  return (
    <Box
      display="flex"
      gridArea="footer"
      alignSelf="start"
      justifySelf={{ _: "center", xl: "start" }}
    >
      <Text
        fontWeight="medium"
        color={{ xl: "blue900", _: "neutral500" }}
        mr="xs"
      >
        &#169; Advisable
      </Text>
      <Text mr="xs" color={{ _: "neutral500", xl: "blue900" }}>
        •
      </Text>
      <Link.External to="/" color={{ xl: "blue900", _: "neutral500" }}>
        Privacy & Terms
      </Link.External>
    </Box>
  );
}

export default Footer;
