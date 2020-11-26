import React from "react";
import queryString from "query-string";
import { Box, Card, Text, Button } from "@advisable/donut";
import { Form, Formik } from "formik";
import SubmitButton from "components/SubmitButton";
import FormField from "components/FormField";
import OrbitsBackground from "../../OrbitsBackground";
import validationSchema from "./validationSchema";
import { useHistory, useLocation } from "react-router";
import MotionBox from "../MotionBox";

export default function SetPassword({ nextStep, forwards }) {
  const location = useLocation();
  const history = useHistory();
  const project_id = queryString.parse(location.search)?.pid;
  const initialValues = {
    password: "",
    passwordConfirmation: "",
  };
  const handleSubmit = () => {
    const nextPath = project_id
      ? `/opportunities/${project_id}`
      : nextStep.path;
    history.push(nextPath);
  };
  return (
    <>
      <OrbitsBackground step={2} />
      <MotionBox forwards={forwards} py="xl" zIndex={2} position="relative">
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
          <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            <Form>
              <Box mb="m">
                <FormField
                  type="password"
                  name="password"
                  placeholder="assistanttotheregionalmanager1"
                  label="Password"
                />
              </Box>
              <Box mb="2xl">
                <FormField
                  type="password"
                  name="passwordConfirmation"
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
      </MotionBox>
    </>
  );
}
