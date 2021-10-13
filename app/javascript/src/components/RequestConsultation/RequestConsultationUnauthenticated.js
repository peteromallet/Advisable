import React, { useState } from "react";
import { Box, Text, Heading, Button } from "@advisable/donut";
import RequestConsultationLogin from "./RequestConsultationLogin";

const SIGNUP = "SIGNUP";
const LOGIN = "LOGIN";

function RequestConsultationSignup({ specialist, setStep }) {
  return (
    <>
      <Heading marginBottom={2} letterSpacing="-0.03em">
        Welcome to Advisable
      </Heading>
      <Text fontSize="l" marginBottom={6}>
        Create an account to connect with {specialist.firstName}.
      </Text>
      <Box padding={6} border="1px solid" borderColor="neutral100">
        <Text fontWeight={500} fontSize="l" marginBottom={1}>
          Signup as a company
        </Text>
        <Text>Find proven people and projects</Text>
      </Box>
      <Box padding={6} border="1px solid" borderColor="neutral100">
        <Text fontWeight={500} fontSize="l" marginBottom={1}>
          Signup as a freelancer
        </Text>
        <Text>Be found for freelance projects</Text>
      </Box>

      <Text fontWeight={500} marginBottom={1}>
        Already have an account?
      </Text>
      <Button variant="subtle" onClick={() => setStep(LOGIN)}>
        Login
      </Button>
    </>
  );
}

export default function RequestConsultationUnauthenticated({ specialist }) {
  const [step, setStep] = useState(SIGNUP);

  switch (step) {
    case LOGIN: {
      return (
        <RequestConsultationLogin specialist={specialist} setStep={setStep} />
      );
    }

    default: {
      return (
        <RequestConsultationSignup specialist={specialist} setStep={setStep} />
      );
    }
  }
}
