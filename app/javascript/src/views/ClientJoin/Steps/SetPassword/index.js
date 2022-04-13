import React from "react";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router";
import { Heading, Box, Text, Error } from "@advisable/donut";
import SubmitButton from "src/components/SubmitButton";
import FormField from "src/components/FormField";
import MotionCard from "../MotionCard";
import validationSchema from "./validationSchema";
import { useUpdatePassword } from "../queries";

export default function SetPassword({ forwards }) {
  const [setPassword] = useUpdatePassword();
  const navigate = useNavigate();
  const initialValues = {
    password: "",
    passwordConfirmation: "",
  };

  const handleSubmit = async (values, { setStatus }) => {
    setStatus(null);
    const res = await setPassword({ variables: { input: values } });

    if (res.errors) {
      setStatus(res.errors[0]?.message);
      return;
    }

    navigate("/setup", { replace: true });
  };

  return (
    <MotionCard forwards={forwards}>
      <Box textAlign="center" marginBottom={6}>
        <Heading size="4xl" marginBottom={3}>
          Welcome to Advisable!
        </Heading>
        <Text fontSize="lg" color="neutral700">
          Set the password that you&apos;ll use to log in to your account.
        </Text>
      </Box>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ status }) => (
          <Form>
            <Box mb="m">
              <FormField
                autoFocus
                type="password"
                name="password"
                size={["sm", "md"]}
                placeholder="assistanttotheregionalmanager1"
                label="Password"
              />
            </Box>
            <Box mb={[4, 8]}>
              <FormField
                type="password"
                size={["sm", "md"]}
                name="passwordConfirmation"
                placeholder="assistanttotheregionalmanager1"
                label="Confirm password"
              />
            </Box>
            <Error>{status}</Error>
            <SubmitButton
              size={["m", "l"]}
              variant="gradient"
              mb={{ xs: 3 }}
              width="100%"
            >
              Continue
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </MotionCard>
  );
}
