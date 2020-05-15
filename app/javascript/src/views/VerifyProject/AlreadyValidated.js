import React from "react";
import { Container, Text } from "@advisable/donut";

function AlreadyValidated() {
  return (
    <Container maxWidth="500px">
      <Text
        mb="12px"
        color="blue900"
        fontSize="28px"
        lineHeight="32px"
        fontWeight="medium"
        letterSpacing="-0.02em"
        textAlign="center"
      >
        Project validated
      </Text>
      <Text
        fontSize="17px"
        lineHeight="24px"
        color="neutral700"
        mb="40px"
        textAlign="center"
      >
        This project has already been validated.
      </Text>
    </Container>
  );
}

export default AlreadyValidated;
