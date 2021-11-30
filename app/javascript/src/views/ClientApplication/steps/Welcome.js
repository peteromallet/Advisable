import React from "react";
import { motion } from "framer-motion";
import { Redirect } from "react-router-dom";
import { Heading, Box, Text, Link, Button, theme } from "@advisable/donut";
import AnimatedCard from "../components/AnimatedCard";
import { validationSchema as companyOverviewValidationSchema } from "./CompanyOverview";
import { validationSchema as companyStageValidationSchema } from "./CompanyStage";
import { validationSchema as goalsValidationSchema } from "./Goals";
import { validationSchema as requirementsValidationSchema } from "./Requirements";
import Pencil from "src/illustrations/zest/pencil";

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
    validationSchema: requirementsValidationSchema,
    path: "/clients/apply/requirements",
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
          In order to understand how best to serve you, we’d first like to ask
          you some questions about your company, goals, and requirements.
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
