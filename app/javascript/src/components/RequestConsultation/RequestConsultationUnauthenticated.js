import css from "@styled-system/css";
import React, { useState } from "react";
import { ArrowRight } from "@styled-icons/heroicons-solid";
import { Box, Text, Heading, Link, Stack } from "@advisable/donut";
import RequestConsultationLogin from "./RequestConsultationLogin";
import RequestConsultationClientSignup from "./RequestConsultationClientSignup";
import RequestConsultationFreelancerSignup from "./RequestConsultationFreelancerSignup";

const LOGIN = "LOGIN";
const SIGNUP = "SIGNUP";
const COMPANY_SIGNUP = "COMPANY_SIGNUP";
const FREELANCER_SIGNUP = "FREELANCER_SIGNUP";

function SignupOption({ title, description, ...props }) {
  return (
    <Box
      {...props}
      css={css({
        padding: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
        border: "1px solid",
        borderRadius: "12px",
        borderColor: "neutral200",
        transition: "border-color 200ms, box-shadow 200ms",
        "&:hover": {
          boxShadow: "0 8px 24px -8px rgba(0, 0, 0, 0.12)",
        },
      })}
    >
      <Box>
        <Text fontWeight={500} fontSize="l" marginBottom={1}>
          {title}
        </Text>
        <Text>{description}</Text>
      </Box>
      <Box color="neutral400">
        <ArrowRight size={20} />
      </Box>
    </Box>
  );
}

function RequestConsultationSignup({ specialist, setStep }) {
  return (
    <>
      <Heading marginBottom={2} letterSpacing="-0.03em">
        Welcome to Advisable
      </Heading>
      <Text fontSize="l" marginBottom={6}>
        Create an account to connect with {specialist.firstName}.
      </Text>
      <Stack spacing={2} marginBottom={6}>
        <SignupOption
          title="Signup as a company"
          description="Find proven people and projects"
          onClick={() => setStep(COMPANY_SIGNUP)}
        />
        <SignupOption
          title="Signup as a freelancer"
          description="Be found for freelance projects"
          onClick={() => setStep(FREELANCER_SIGNUP)}
        />
      </Stack>

      <Text fontWeight={500} marginBottom={1}>
        Already have an account?
      </Text>
      <Link.External
        href="#"
        variant="underlined"
        onClick={() => setStep(LOGIN)}
      >
        Login
      </Link.External>
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

    case COMPANY_SIGNUP: {
      return (
        <RequestConsultationClientSignup
          specialist={specialist}
          setStep={setStep}
        />
      );
    }

    case FREELANCER_SIGNUP: {
      return (
        <RequestConsultationFreelancerSignup
          specialist={specialist}
          setStep={setStep}
        />
      );
    }

    default: {
      return (
        <RequestConsultationSignup specialist={specialist} setStep={setStep} />
      );
    }
  }
}
