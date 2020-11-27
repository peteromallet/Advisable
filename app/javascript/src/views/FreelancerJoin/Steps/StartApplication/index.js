import React from "react";
import { Form, Formik } from "formik";
import queryString from "query-string";
import { useQuery } from "@apollo/client";
import { useHistory, useLocation } from "react-router";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import { Box, Card, Text, Input } from "@advisable/donut";
import validationSchema from "./validationSchema";
import Description from "./Description";
import { GET_PROJECT } from "../queries";
import MotionBox from "../MotionBox";
import HaveAccount from "../HaveAccount";

export default function StartApplication({ nextStep, forwards }) {
  const history = useHistory();
  const location = useLocation();
  const project_id = queryString.parse(location.search)?.pid;
  const { data, loading, error } = useQuery(GET_PROJECT, {
    variables: { id: project_id },
  });

  if (project_id && loading) return <>loading</>;
  // Clean query string if pid is wrong
  if (project_id && error) history.replace(history.pathname);

  const initialValues = {
    fullName: location.state?.fullName || "",
    email: location.state?.email || "",
  };

  const handleSubmit = (values) => {
    // redirect to set password step, pass values, and preserve query string param
    history.replace({ ...history.location }, { ...values });
    history.push(
      { ...history.location, pathname: nextStep.path },
      { ...values },
    );
  };

  return (
    <MotionBox
      forwards={forwards}
      zIndex={2}
      position="relative"
      my="auto"
      pb={20}
    >
      <Card padding="2xl" width={650} marginX="auto">
        <Box mb={8}>
          <Description project={data?.project} />
          {project_id && error && (
            <Text color="red400" pt={2}>
              The project you&apos;ve tried to apply is not available.
            </Text>
          )}
        </Box>
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
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
                label="Email"
              />
            </Box>
            <Box display="flex">
              <SubmitButton size="l" variant="dark">
                Get Started
              </SubmitButton>
              <HaveAccount />
            </Box>
          </Form>
        </Formik>
      </Card>
    </MotionBox>
  );
}
