import React from "react";
import { motion } from "framer-motion";
import { Redirect } from "react-router-dom";
import { Box, Text, Link, Button } from "@advisable/donut";
import image from "../images/welcome-illustration.png";
import AnimatedCard from "../components/AnimatedCard";
import { validationSchema as introductionValidationSchema } from "./Introduction";
import { validationSchema as overviewValidationSchema } from "./Overview";
import { validationSchema as idealProjectValidationSchema } from "./IdealProject";
import { validationSchema as previousWorkValidationSchema } from "./PreviousWork";
import { validationSchema as workPreferencesValidationSchema } from "./WorkPreferences";

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
          projects. Once you’re accepted into the Advisable network, we’ll begin
          matching you with projects you might like to apply for.
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
