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
        color={{ _: "neutral900", xl: "neutral500" }}
        mr="xs"
      >
        &#169; Advisable
      </Text>
      <Text mr="xs" color={{ xl: "neutral500", _: "neutral900" }}>
        •
      </Text>
      <Link.External
        href="https://advisable.com/legal/terms-of-service/"
        color={{ _: "neutral900", xl: "neutral500" }}
      >
        Terms of Service
      </Link.External>
    </Box>
  );
}

export default Footer;
