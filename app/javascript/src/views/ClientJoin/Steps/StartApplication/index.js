import React from "react";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router";
import { Box, Text, Input, Error, Link, Heading } from "@advisable/donut";
import SubmitButton from "src/components/SubmitButton";
import FormField from "src/components/FormField";
import useViewer from "src/hooks/useViewer";
import validationSchema from "./validationSchema";
import MotionCard from "../MotionCard";
import { useCreateClientAccount } from "../queries";
import LoginWithGoogle from "src/views/Login/LoginWithGoogle";
import Divider from "src/components/Divider";

export default function StartApplication({ nextStep, forwards }) {
  const viewer = useViewer();
  const navigate = useNavigate();
  const [createClientAccount] = useCreateClientAccount();

  const initialValues = {
    firstName: viewer?.firstName || "",
    lastName: viewer?.lastName || "",
    email: viewer?.email || "",
  };

  const handleSubmit = async (values, { setStatus }) => {
    setStatus(null);
    const res = await createClientAccount({
      variables: { input: { ...values } },
    });

    if (res.errors) {
      setStatus(res.errors[0]?.message);
      return;
    }

    navigate(nextStep.path);
  };

  return (
    <MotionCard forwards={forwards}>
      <>
        <Box textAlign="center" marginBottom={8}>
          <Heading size="4xl" marginBottom={3}>
            Get started
          </Heading>
          <Text fontSize="lg" color="neutral700">
            Already have an account?{" "}
            <Link to="/login" variant="underlined">
              Login
            </Link>
          </Text>
        </Box>
        <LoginWithGoogle size="xl" mode="user" navigate="/clients/apply">
          Signup with Google
        </LoginWithGoogle>
        <Divider py={6}>Or</Divider>
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({ status }) => (
            <Form>
              <Box display="flex" flexDirection={["column", "row"]}>
                <Box mb={4} mr={[0, 2]} width="100%">
                  <FormField
                    as={Input}
                    name="firstName"
                    size={["sm", "md"]}
                    placeholder="First name"
                  />
                </Box>
                <Box mb={4} ml={[0, 2]} width="100%">
                  <FormField
                    as={Input}
                    name="lastName"
                    size={["sm", "md"]}
                    placeholder="Last name"
                  />
                </Box>
              </Box>
              <Box mb={4}>
                <FormField
                  as={Input}
                  name="email"
                  size={["sm", "md"]}
                  placeholder="Email address"
                />
              </Box>
              <Error>{status}</Error>
              <SubmitButton size={["m", "l"]} variant="gradient" width="100%">
                Create Your Free Account
              </SubmitButton>
            </Form>
          )}
        </Formik>
        <Divider py={8} />
        <Box textAlign="center">
          <Text
            fontWeight={480}
            fontSize="md"
            marginBottom={2}
            color="neutral700"
            letterSpacing="-0.016em"
          >
            Looking to create a freelancer account?
          </Text>
          <Link to="/freelancers/join" fontSize="m" variant="underlined">
            Signup as a freelancer
          </Link>
        </Box>
      </>
    </MotionCard>
  );
}
