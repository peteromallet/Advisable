import React from "react";
import { useHistory, useLocation } from "react-router";
import queryString from "query-string";
import { Form, Formik } from "formik";
import {
  Box,
  Text,
  Input,
  Error,
  Link,
  Heading,
  useBreakpoint,
} from "@advisable/donut";
import useViewer from "src/hooks/useViewer";
import Divider from "src/components/Divider";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import LoginWithGoogle from "src/views/Login/LoginWithGoogle";
import MotionCard from "../MotionCard";
import { useCreateFreelancerAccount, useUpdateProfile } from "../queries";
import validationSchema from "./validationSchema";

export default function StartApplication({ nextStep, forwards }) {
  const viewer = useViewer();
  const history = useHistory();
  const location = useLocation();
  const isMobile = useBreakpoint("s");
  const queryParams = queryString.parse(location.search);
  const project_id = queryParams?.pid;
  const [updateProfile] = useUpdateProfile();
  const [createFreelancerAccount] = useCreateFreelancerAccount();

  const initialValues = {
    firstName: viewer?.firstName || queryParams?.firstName || "",
    lastName: viewer?.lastName || queryParams?.lastName || "",
    email: viewer?.email || queryParams?.email || "",
  };

  const handleSubmit = async (values, { setStatus }) => {
    setStatus(null);
    const res = viewer
      ? await updateProfile({
          variables: { input: values },
        })
      : await createFreelancerAccount({
          variables: {
            input: {
              ...values,
              pid: queryParams?.pid,
              campaignName: queryParams?.utm_campaign,
              campaignSource: queryParams?.utm_source,
              referrer: queryParams?.rid,
            },
          },
        });

    if (res.errors) {
      setStatus(res.errors[0]?.message);
      return;
    }

    const id = viewer
      ? res?.data?.createFreelancerAccount?.viewer?.id
      : res?.data?.updateProfile?.specialist?.id;
    history.push({ ...history.location, pathname: nextStep.path }, { id });
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
        <LoginWithGoogle
          size="xl"
          mode="specialist"
          navigate="/freelancers/apply"
        >
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
                {project_id
                  ? isMobile
                    ? "Request Details"
                    : "Request more details"
                  : "Get Started"}
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
            Looking to create a client account?
          </Text>
          <Link to="/clients/join" fontSize="m" variant="underlined">
            Signup as a client
          </Link>
        </Box>
      </>
    </MotionCard>
  );
}
