import React from "react";
import { Box, Text, Heading } from "@advisable/donut";
import CircularButton from "src/components/CircularButton";
import { ArrowLeft } from "@styled-icons/heroicons-solid";
import LoginForm from "src/views/Login/LoginForm";

export default function RequestConsultationLogin({ specialist, setStep }) {
  return (
    <>
      <Box position="absolute" top="12px" left="12px">
        <CircularButton onClick={() => setStep("SIGNUP")} icon={ArrowLeft} />
      </Box>
      <Heading textAlign="center" marginBottom={2} letterSpacing="-0.04em">
        Welcome back
      </Heading>
      <Text textAlign="center" fontSize="l" marginBottom={6}>
        Login to your account to connect with {specialist.firstName}.
      </Text>
      <LoginForm />
    </>
  );
}
