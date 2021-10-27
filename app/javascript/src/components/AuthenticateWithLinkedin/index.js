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
        mb={1}
        fontSize="l"
        color="neutral900"
        lineHeight="m"
        fontWeight={550}
        letterSpacing="-0.02em"
      >
        Authenticate with LinkedIn to validate your identity
      </Text>
      <Box maxWidth="300px" mx="auto" mb={6}>
        <Text fontSize="sm" lineHeight="20px" color="neutral800">
          This won&apos;t create an account. We only use this to validate your
          identity.
        </Text>
      </Box>
      <LoginWithLinkedin />
    </Box>
  );
}

export default AuthenticateWithLinkedin;
