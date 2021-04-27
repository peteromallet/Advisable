import React from "react";
import { motion } from "framer-motion";
import { Redirect } from "react-router-dom";
import { Box, Text, Link, Button } from "@advisable/donut";
import image from "../images/welcome-illustration.png";
import AnimatedCard from "../components/AnimatedCard";
import { validationSchema as companyOverviewValidationSchema } from "./CompanyOverview";
import { validationSchema as companyStageValidationSchema } from "./CompanyStage";
import { validationSchema as goalsValidationSchema } from "./Goals";
import { validationSchema as preferencesValidationSchema } from "./Preferences";

const stepsMeta = [
  {
    validationSchema: companyOverviewValidationSchema,
    path: "/clients/apply/company-overview",
  },
  {
    validationSchema: companyStageValidationSchema,
    path: "/clients/apply/company-stage",
  },
  {
    validationSchema: goalsValidationSchema,
    path: "/clients/apply/goals",
  },
  {
    validationSchema: preferencesValidationSchema,
    path: "/clients/apply/preferences",
  },
];

export default function Welcome({ clientApplication }) {
  // Looking for a first non-filled step to redirect there
  const actualStepIndex = stepsMeta.findIndex((step) => {
    return !step.validationSchema.isValidSync(clientApplication);
  });

  if (actualStepIndex > 0)
    return (
      <motion.div exit>
        <Redirect to={stepsMeta[actualStepIndex].path} />
      </motion.div>
    );

  return (
    <AnimatedCard>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
      >
        <Box width="352px" height="248px" marginBottom={6}>
          <Box as="img" src={image} width="100%" />
        </Box>
        <Text
          color="#00404E"
          fontSize="5xl"
          fontWeight="medium"
          marginBottom={3}
        >
          Welcome to Advisable
        </Text>
        <Text
          fontSize="lg"
          color="neutral800"
          marginBottom={10}
          lineHeight="1.2"
        >
          We need to know a little more about you so we can find you the right
          projects. Once you’re accepted, you&apos;ll gain access to our
          freelancer&apos;s best projects and will be able to hire them.
        </Text>
        <Button
          as={Link}
          to="/clients/apply/company-overview"
          variant="gradient"
          size="l"
        >
          Get Started
        </Button>
      </Box>
    </AnimatedCard>
  );
}
