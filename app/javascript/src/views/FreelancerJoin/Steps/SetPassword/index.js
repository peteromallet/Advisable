import React from "react";
import { Box, Card, Text, Button, Input } from "@advisable/donut";
import { Form, Formik } from "formik";
import SubmitButton from "components/SubmitButton";
import FormField from "components/FormField";
import { motion } from "framer-motion";
import OrbitsBackground from "../../OrbitsBackground";

export default function SetPassword() {
  return (
    <>
      <OrbitsBackground step={2} />
      <Box as={motion.div} exit py="xl" zIndex={2} position="relative">
        <Card padding="2xl" width={650} marginX="auto">
          <Box mb="xl">
            <Text as="h2" fontSize="4xl" mb="xs" color="neutral900">
              Welcome to Advisable!
            </Text>
            <Text as="p" color="neutral800" fontSize="m" lineHeight="m">
              Set the password on your Advisable account to see the status of
              your applications on Advisable and manage your work.
            </Text>
          </Box>
          <Formik>
            <Form>
              <Box mb="m">
                <FormField
                  as={Input}
                  name="password"
                  placeholder="assistanttotheregionalmanager1"
                  label="Password"
                />
              </Box>
              <Box mb="2xl">
                <FormField
                  as={Input}
                  name="confirmPassword"
                  placeholder="assistanttotheregionalmanager1"
                  label="Confirm password"
                />
              </Box>
              <Box display="flex">
                <SubmitButton size="l">Get Started</SubmitButton>
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
    </>
  );
}
