import React from "react";
import { Text, Heading, Link } from "@advisable/donut";
import LoginForm from "src/views/Login/LoginForm";

export default function RequestConsultationLogin({ specialist, setStep }) {
  return (
    <>
      <Heading size="5xl" marginBottom={2}>
        Welcome back
      </Heading>
      <Text fontSize="l" marginBottom={6}>
        Login to your account to connect with {specialist.firstName}.
      </Text>
      <LoginForm />

      <Text marginTop={6} fontWeight={500} marginBottom={1}>
        Don&apos;t have an account?
      </Text>
      <Link.External
        href="#"
        variant="underlined"
        onClick={() => setStep("SIGNUP")}
      >
        Create an account
      </Link.External>
    </>
  );
}
