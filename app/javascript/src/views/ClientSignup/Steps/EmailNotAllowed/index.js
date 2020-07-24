import React from "react";
import { Box, Text, Link } from "@advisable/donut";

function EmailNotAllowed() {
  return (
    <Box>
      <Text
        as="h2"
        fontSize="xxxl"
        lineHeight="xxxl"
        fontWeight="semibold"
        color="blue800"
        mb="m"
        letterSpacing="-0.02em"
      >
        Public emails are not allowed
      </Text>
      <Text>
        You could either email{" "}
        <Link.External href="mailto:hello@advisable.com">
          hello@advisable.com
        </Link.External>{" "}
        to tell us why you should be considered for Advisable or try again with
        your corporate email.
      </Text>
    </Box>
  );
}

export default EmailNotAllowed;
