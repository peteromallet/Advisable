import React from "react";
import { Box, Text } from "@advisable/donut";
import LoginWithLinkedin from "./LoginWithLinkedin";

function AuthenticateWithLinkedin() {
  return (
    <Box
      bg="blue50"
      padding={{ _: 5, m: 14 }}
      textAlign="center"
      borderRadius="20px"
    >
      <Text
        mb={5}
        fontSize="l"
        color="neutral900"
        lineHeight="m"
        fontWeight={550}
      >
        Authenticate with LinkedIn to validate your identity
      </Text>
      <LoginWithLinkedin />
      <Text color="neutral500" fontStyle="italic" mt={2} fontSize="xs">
        *This won&apos;t create an account
      </Text>
    </Box>
  );
}

export default AuthenticateWithLinkedin;
