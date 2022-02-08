import React from "react";
import {
  Box,
  Button,
  Circle,
  Container,
  Heading,
  Text,
  theme,
} from "@advisable/donut";
import { Link, useParams } from "react-router-dom";
import { ArrowSmRight, ShieldCheck } from "@styled-icons/heroicons-solid";
import ListIllustration from "src/illustrations/zest/list";
import ThumbsupIllustration from "src/illustrations/zest/thumbsup";
import PiggybankIllustration from "src/illustrations/zest/piggybank";

function IntroductionStep({ heading, illustration, children }) {
  return (
    <Box flex={1}>
      {React.createElement(illustration, {
        width: "200px",
        mb: 6,
        color: theme.colors.blue200,
      })}
      <Text fontWeight={560} mb={2} fontSize="xl" letterSpacing="-0.02em">
        {heading}
      </Text>
      <Text lineHeight="24px" fontSize="17px">
        {children}
      </Text>
    </Box>
  );
}

function AdvisableProtection() {
  return (
    <Box marginBottom={12}>
      <Box height="1px" bg="neutral100" marginBottom={8} />
      <Box display="flex" maxWidth="640px">
        <Box flexShrink={0}>
          <Circle bg="neutral100" size="52px" color="blue800">
            <ShieldCheck size={28} />
          </Circle>
        </Box>
        <Box paddingLeft={5}>
          <Text
            fontSize="lg"
            fontWeight={560}
            marginBottom={1.5}
            letterSpacing="-0.02em"
          >
            You’re protected by Advisable
          </Text>
          <Text lineHeight="24px" color="neutral800">
            In the rare event that the client is unhappy with your work,
            Advisable guarantees each new collaboration with a $1,000 risk free
            trial.
          </Text>
        </Box>
      </Box>
      <Box height="1px" bg="neutral100" marginTop={8} />
    </Box>
  );
}

export default function NewAgreementIntroduction({ user }) {
  const { userId } = useParams();
  const companyName = user.company?.name;

  return (
    <Container paddingY={12} maxWidth="1080px">
      <Heading mb={4} size="6xl">
        Work with {companyName}
      </Heading>
      <Text fontSize="lg">
        Send {companyName} a request to work together on Advisable.
      </Text>

      <Box display="flex" style={{ gap: "40px" }} marginY={16}>
        <IntroductionStep
          heading="1. Create an agreement"
          illustration={ListIllustration}
        >
          Fill out our agreement template based on the conversation that you had
          with {companyName}.
        </IntroductionStep>
        <IntroductionStep
          illustration={ThumbsupIllustration}
          heading="2. Review and accept"
        >
          {companyName} can review and accept your agreement in order to start
          working together.
        </IntroductionStep>
        <IntroductionStep
          illustration={PiggybankIllustration}
          heading="3. Request payments"
        >
          Once {companyName} has accepted your request, you can being working
          together and request payment accordingly.
        </IntroductionStep>
      </Box>

      <AdvisableProtection />

      <Link to={`/new_agreement/${userId}/collaboration`}>
        <Button size="l" variant="gradient" suffix={<ArrowSmRight />}>
          Get Started
        </Button>
      </Link>
    </Container>
  );
}
