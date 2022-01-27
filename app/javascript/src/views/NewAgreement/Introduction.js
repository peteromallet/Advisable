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

export default function NewAgreementIntroduction({ user }) {
  const { userId } = useParams();
  const companyName = user.company?.name;

  return (
    <Container paddingY={10} maxWidth="1080px">
      <Heading mb={2} size="6xl">
        Work with {companyName}
      </Heading>
      <Text fontSize="lg">
        Send {companyName} a request to work together on Advisable.
      </Text>

      <Box display="flex" style={{ gap: "40px" }} marginY={12}>
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
          Once {companyName} has accepted your request, you being working
          together and request payment accordingly.
        </IntroductionStep>
      </Box>

      <Box
        padding={5}
        display="flex"
        maxWidth="640px"
        marginBottom={12}
        border="1px solid"
        borderRadius="20px"
        borderColor="neutral200"
      >
        <Box flexShrink={0}>
          <Circle bg="neutral100" size="52px" color="blue800">
            <ShieldCheck size={28} />
          </Circle>
        </Box>
        <Box paddingLeft={4}>
          <Text
            fontWeight={560}
            marginBottom={1}
            fontSize="lg"
            letterSpacing="-0.02em"
          >
            You’re protected by Advisable
          </Text>
          <Text lineHeight="20px" color="neutral800">
            In the rare event that the client is unhapppy with your work,
            Advisable guarantees each new collaboration with a $1,000 risk free
            trial.
          </Text>
        </Box>
      </Box>

      <Link to={`/new_agreement/${userId}/collaboration`}>
        <Button size="l" variant="gradient" suffix={<ArrowSmRight />}>
          Get Started
        </Button>
      </Link>
    </Container>
  );
}
