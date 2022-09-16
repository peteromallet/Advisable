import React from "react";
import { Formik, Form } from "formik";
import { object, string, ref } from "yup";
import { Navigate, useLocation } from "react-router";
import { Card, Box, Text } from "@advisable/donut";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import useViewer from "src/hooks/useViewer";
import { useUpdatePassword } from "./queries";
import messageForError from "src/utilities/errorMessages";

const validationSchema = object({
  password: string()
    .required("Please enter a password")
    .min(8, "Password must be at least 8 characters long"),
  passwordConfirmation: string()
    .oneOf([ref("password"), null], "Password does not match")
    .required("Please confirm your password"),
});

export default function SetPassword() {
  const viewer = useViewer();
  const location = useLocation();
  const [setPassword] = useUpdatePassword();
  const { from } = location.state || {
    from: { pathname: "/" },
  };

  if (!viewer.needsToSetAPassword) {
    return <Navigate replace to={from} />;
  }

  const initialValues = {
    password: "",
    passwordConfirmation: "",
  };

  async function handleSubmit(values, formik) {
    const { errors } = await setPassword({
      variables: {
        input: values,
      },
    });

    if (errors) {
      formik.setStatus(messageForError(errors?.[0]));
      formik.setSubmitting(false);
      return;
    }
  }

  return (
    <Box py={12}>
      <Card
        mx="auto"
        maxWidth="500px"
        p={["0", "10"]}
        elevation={["none", "m"]}
        variant={["ghost", "white"]}
        borderRadius="12px"
      >
        <Text
          as="h3"
          mb="1"
          fontSize="4xl"
          color="neutral900"
          fontWeight="medium"
          letterSpacing="-0.04rem"
        >
          Please set a password
        </Text>
        <Text
          mb="6"
          color="neutral700"
          lineHeight="1.4rem"
          letterSpacing="-0.01rem"
        >
          We have noticed you have not set a password for your account yet.
        </Text>
        <Formik
          validateOnMount
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          initialValues={initialValues}
        >
          {(formik) => (
            <Form>
              <FormField
                type="password"
                name="password"
                label="Password"
                marginBottom="8"
                placeholder="Password"
              />
              <FormField
                type="password"
                name="passwordConfirmation"
                label="Confirm password"
                marginBottom="8"
                placeholder="Confirm password"
              />
              <SubmitButton disableUntilValid size="l" width="100%">
                Set Password
              </SubmitButton>
              {formik.status && (
                <Box
                  mt="3"
                  bg="red100"
                  padding="3"
                  fontSize="s"
                  color="red600"
                  borderRadius="12px"
                >
                  {formik.status}
                </Box>
              )}
            </Form>
          )}
        </Formik>
      </Card>
    </Box>
  );
}
