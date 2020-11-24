import React from "react";
import { Form, Formik } from "formik";
import FormField from "components/FormField";
import SubmitButton from "components/SubmitButton";
import { Box, Card, Text, Input, Button } from "@advisable/donut";
import { useHistory } from "react-router";
import useSteps from "../../../../hooks/useSteps";
import STEPS from "../.";
import { motion } from "framer-motion";

export default function StartApplication() {
  const { nextStep } = useSteps(STEPS);
  const history = useHistory();
  const initialValues = {
    fullName: "",
    email: "",
  };
  const handleSubmit = () => {
    history.push(nextStep.path);
  };
  return (
    <Box as={motion.div} exit py="xl" zIndex={2} position="relative">
      <Card padding="2xl" width={650} marginX="auto">
        <Box mb="xl">
          <Text as="h2" fontSize="4xl" mb="xs" color="neutral900">
            Apply to join our network of top freelancers
          </Text>
          <Text as="p" color="neutral800" fontSize="m" lineHeight="m">
            Join our network of freelancers and Per lectus magnis etiam
            malesuada accumsan suscipit convallis luctus cursus semper porta
            mollis
          </Text>
        </Box>
        <Formik onSubmit={handleSubmit} initialValues={initialValues}>
          <Form>
            <Box mb="m">
              <FormField
                as={Input}
                name="fullName"
                placeholder="Dwight Schrutt"
                label="Full Name"
              />
            </Box>
            <Box mb="2xl">
              <FormField
                as={Input}
                name="email"
                placeholder="dwight@dundermifflin.com"
                label="Company email address"
              />
            </Box>
            <Box display="flex">
              <SubmitButton size="l" variant="dark">
                Get Started
              </SubmitButton>
              <Box ml="auto" display="flex" flexDirection="column">
                <Text>Already have an account?</Text>
                <Button
                  onClick={() => history.push("/login")}
                  size="m"
                  variant="ghost"
                  ml="auto"
                >
                  Login
                </Button>
              </Box>
            </Box>
          </Form>
        </Formik>
      </Card>
    </Box>
  );
}
