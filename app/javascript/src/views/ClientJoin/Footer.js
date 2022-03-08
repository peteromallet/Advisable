import React from "react";
import { Link, Text, Box } from "@advisable/donut";

function Footer() {
  return (
    <Box
      display="flex"
      justifyContent={{ _: "center", xl: "start" }}
      my={{ _: 8, xl: 0 }}
      position={{ _: "absolute", xl: "relative" }}
      bottom={0}
      width="100%"
      gridArea="footer"
      alignSelf="start"
      justifySelf={{ _: "center", xl: "start" }}
    >
      <Text
        fontWeight="medium"
        color={{ xl: "neutral900", _: "neutral500" }}
        mr="xs"
      >
        &#169; Advisable
      </Text>
      <Text mr="xs" color={{ _: "neutral500", xl: "neutral900" }}>
        •
      </Text>
      <Link.External
        href="https://advisable.com/legal/terms-of-service/"
        color={{ xl: "neutral900", _: "neutral500" }}
      >
        Terms of Service
      </Link.External>
    </Box>
  );
}

export default Footer;
