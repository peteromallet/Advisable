import React, { useEffect } from "react";
import queryString from "query-string";
import { Box, Text } from "@advisable/donut";
import { Form, Formik } from "formik";
import SubmitButton from "components/SubmitButton";
import FormField from "components/FormField";
import validationSchema from "./validationSchema";
import { useHistory, useLocation } from "react-router";
import MotionBox from "../MotionBox";
import HaveAccount from "../HaveAccount";
import useViewer from "src/hooks/useViewer";
import { useUpdatePassword } from "../queries";

export default function SetPassword({ nextStep, prevStep, forwards }) {
  const viewer = useViewer();
  const { search } = useLocation();
  const [setPassword] = useUpdatePassword();
  const history = useHistory();
  const project_id = queryString.parse(search)?.pid;
  const initialValues = {
    password: "",
    passwordConfirmation: "",
  };

  useEffect(() => {
    if (!viewer) {
      history.replace({ pathname: prevStep.path });
    }
  }, [viewer, history, prevStep.path]);

  const handleSubmit = async (values) => {
    await setPassword({ variables: { input: values } });

    const nextPath = project_id
      ? `/opportunities/${project_id}`
      : nextStep.path;

    history.push(nextPath);
  };

  return (
    <MotionBox forwards={forwards}>
      <Box mb="xl">
        <Text as="h2" fontSize="4xl" mb="xs" color="neutral900">
          Welcome to Advisable!
        </Text>
        <Text as="p" color="neutral800" fontSize="m" lineHeight="m">
          Set the password on your account to create your profile, manage your
          applications, and see your work.
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
              size={["sm", "md"]}
              placeholder="assistanttotheregionalmanager1"
              label="Password"
            />
          </Box>
          <Box mb="2xl">
            <FormField
              type="password"
              size={["sm", "md"]}
              name="passwordConfirmation"
              placeholder="assistanttotheregionalmanager1"
              label="Confirm password"
            />
          </Box>
          <Box display="flex">
            <SubmitButton size="l">Get Started</SubmitButton>
            <HaveAccount />
          </Box>
        </Form>
      </Formik>
    </MotionBox>
  );
}
