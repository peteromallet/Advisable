import React from "react";
import { Box, Text, Link } from "@advisable/donut";
import LoginWithLinkedin from "./LoginWithLinkedin";

function AuthenticateWithLinkedin() {
  return (
    <Box bg="blue50" padding="40px" textAlign="center" borderRadius="20px">
      <Text
        mb="20px"
        fontSize="17px"
        color="blue900"
        lineHeight="22px"
        fontWeight="medium"
      >
        Please login with Linkedin to unlock the full details and verify this
        project
      </Text>
      <LoginWithLinkedin />
      <Text fontWeight="medium" mt="24px" mb="xs">
        Don&apos;t have a LinkedIn account?
      </Text>
      <Link.External href="mailto:hello@advisable.com">
        Verify with email
      </Link.External>
    </Box>
  );
}

export default AuthenticateWithLinkedin;
