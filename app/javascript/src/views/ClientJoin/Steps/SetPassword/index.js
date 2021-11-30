import React from "react";
import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import { Redirect, useHistory } from "react-router";
import { Heading, Box, Text, Error } from "@advisable/donut";
import SubmitButton from "src/components/SubmitButton";
import FormField from "src/components/FormField";
import useViewer from "src/hooks/useViewer";
import MotionCard from "../MotionCard";
import validationSchema from "./validationSchema";
import { useUpdatePassword } from "../queries";

export default function SetPassword({ prevStep, forwards }) {
  const [setPassword] = useUpdatePassword();
  const history = useHistory();
  const viewer = useViewer();
  const initialValues = {
    password: "",
    passwordConfirmation: "",
  };

  if (!viewer?.needsToSetAPassword) {
    return (
      <motion.div exit>
        <Redirect to={prevStep.path} />
      </motion.div>
    );
  }

  const handleSubmit = async (values, { setStatus }) => {
    setStatus(null);
    const res = await setPassword({ variables: { input: values } });

    if (res.errors) {
      setStatus(res.errors[0]?.message);
      return;
    }

    history.replace("/clients/apply");
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
