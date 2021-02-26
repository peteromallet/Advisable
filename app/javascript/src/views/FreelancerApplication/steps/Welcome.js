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
    validationSchema: idealProjectValidationSchema,
    path: "/freelancers/apply/ideal_project",
  },
  {
    validationSchema: previousWorkValidationSchema,
    path: "/freelancers/apply/experience",
  },
  {
    validationSchema: workPreferencesValidationSchema,
    path: "/freelancers/apply/preferences",
  },
];

export default function Welcome({ specialist }) {
  // Check if some of the steps were previously filled and redirect there
  // to continue the flow
  const actualStepPathname = stepsMeta.reduce((acc, step, index, array) => {
    const prevIsValid = array[index - 1]?.validationSchema.isValidSync(
      specialist,
    );
    const curIsValid = step.validationSchema.isValidSync(specialist);

    if (prevIsValid && !curIsValid) return step.path;
    return acc;
  });

  if (actualStepPathname)
    return (
      <motion.div exit>
        <Redirect to={actualStepPathname} />
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
        <Text fontSize="lg" color="neutral800" marginBottom={10}>
          We need to know a little more about you before we can find you some
          projects. Once you are accepted into the Advisable network we will
          begin matching you with projects where you can choose to apply or not.
        </Text>
        <Button
          as={Link}
          to="/freelancers/apply/introduction"
          variant="gradient"
        >
          Get Started
        </Button>
      </Box>
    </AnimatedCard>
  );
}
