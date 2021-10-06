import React from "react";
import { Box, Text } from "@advisable/donut";
import LoginWithLinkedin from "./LoginWithLinkedin";

function AuthenticateWithLinkedin() {
  return (
    <Box
      bg="blue50"
      padding={{ _: "20px", m: "40px" }}
      textAlign="center"
      borderRadius="20px"
    >
      <Text
        mb="20px"
        fontSize="17px"
        color="blue900"
        lineHeight="22px"
        fontWeight="medium"
      >
        Please login with LinkedIn to leave a testimonial
      </Text>
      <LoginWithLinkedin />
    </Box>
  );
}

export default AuthenticateWithLinkedin;
