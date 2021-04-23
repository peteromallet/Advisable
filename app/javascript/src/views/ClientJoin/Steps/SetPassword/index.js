import React from "react";
import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import { Redirect, useHistory, useLocation } from "react-router";
import { ChevronRight } from "@styled-icons/feather/ChevronRight";
import { Box, Text, Error } from "@advisable/donut";
import SubmitButton from "src/components/SubmitButton";
import FormField from "src/components/FormField";
import MotionCard from "../MotionCard";
import HaveAccount from "../HaveAccount";
import validationSchema from "./validationSchema";
import { useUpdatePassword } from "../queries";
import { CardHeader } from "../styles";

export default function SetPassword({ prevStep, forwards }) {
  const [setPassword] = useUpdatePassword();
  const history = useHistory();
  const location = useLocation();
  const initialValues = {
    password: "",
    passwordConfirmation: "",
  };

  const { state } = location;
  if (!state?.firstName || !state?.email) {
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
      <CardHeader>Welcome to Advisable!</CardHeader>
      <Text as="p" color="neutral800" fontSize="m" lineHeight="m" mb={8}>
        Set the password on your account to gain access to our freelancers&apos;
        projects and hire the world&apos;s best specialists.
      </Text>
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
            <Box mb={[4, 5]}>
              <FormField
                type="password"
                size={["sm", "md"]}
                name="passwordConfirmation"
                placeholder="assistanttotheregionalmanager1"
                label="Confirm password"
              />
            </Box>
            <Error>{status}</Error>
            <Box
              display="flex"
              flexDirection={{ _: "column", m: "row" }}
              pt={[4, 5]}
            >
              <SubmitButton
                size={["m", "l"]}
                variant="dark"
                mb={{ xs: 3 }}
                suffix={<ChevronRight />}
              >
                Get Started
              </SubmitButton>
              <HaveAccount />
            </Box>
          </Form>
        )}
      </Formik>
    </MotionCard>
  );
}
