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
      as="button"
      css={css({
        padding: 5,
        width: "100%",
        textAlign: "left",
        background: "transparent",
        appearance: "none",
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
        <Heading size="lg" marginBottom={0.5}>
          {title}
        </Heading>
        <Text fontSize="md" fontWeight={420} color="neutral700">
          {description}
        </Text>
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
      <Heading size="5xl" marginBottom={2}>
        Work with {specialist.firstName}
      </Heading>
      <Text
        fontSize="lg"
        fontWeight={420}
        lineHeight="24px"
        color="neutral700"
        marginBottom={6}
      >
        Create an account to connect with {specialist.firstName}.
      </Text>
      <Stack spacing={2} marginBottom={8}>
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
