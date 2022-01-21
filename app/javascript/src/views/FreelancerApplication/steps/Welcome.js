import React from "react";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";
import { theme, Heading, Box, Text, Link, Button } from "@advisable/donut";
import AnimatedCard from "../components/AnimatedCard";
import { validationSchema as introductionValidationSchema } from "./Introduction";
import { validationSchema as overviewValidationSchema } from "./Overview";
import { validationSchema as idealProjectValidationSchema } from "./IdealProject";
import { validationSchema as previousWorkValidationSchema } from "./PreviousWork";
import { validationSchema as workPreferencesValidationSchema } from "./WorkPreferences";
import Pencil from "src/illustrations/zest/pencil";

const stepsMeta = [
  {
    validationSchema: introductionValidationSchema,
    path: "/freelancers/apply/introduction",
  },
  {
    validationSchema: overviewValidationSchema,
    path: "/freelancers/apply/overview",
  },
  {
    validationSchema: previousWorkValidationSchema,
    path: "/freelancers/apply/experience",
  },
  {
    validationSchema: workPreferencesValidationSchema,
    path: "/freelancers/apply/preferences",
  },
  {
    validationSchema: idealProjectValidationSchema,
    path: "/freelancers/apply/ideal_project",
  },
];

export default function Welcome({ specialist }) {
  // Looking for a first non-filled step to redirect there
  const actualStepIndex = stepsMeta.findIndex(
    (step) =>
      !step.validationSchema.isValidSync({
        ...specialist,
        country: specialist.country?.name,
        resume: specialist.resume?.filename,
      }),
  );

  if (actualStepIndex > 0)
    return (
      <motion.div exit>
        <Navigate to={stepsMeta[actualStepIndex].path} />
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
          <Pencil height="280px" color={theme.colors.orange200} />
        </Box>
        <Heading size="5xl" marginBottom={3}>
          Welcome to Advisable
        </Heading>
        <Text
          fontSize="lg"
          color="neutral800"
          marginBottom={10}
          lineHeight="1.2"
        >
          In order to help figure out if we&apos;re a good fit for one another,
          we&apos;d first like to ask a few questions about you, your
          background, and your preferences.
        </Text>
        <Button
          as={Link}
          to="/freelancers/apply/introduction"
          variant="gradient"
          size="l"
        >
          Get Started
        </Button>
      </Box>
    </AnimatedCard>
  );
}
