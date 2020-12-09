import React, { useEffect } from "react";
import queryString from "query-string";
import { Form, Formik } from "formik";
import { useHistory, useLocation } from "react-router";
import { ChevronRight } from "@styled-icons/feather";
import { Box, Text, Error } from "@advisable/donut";
import SubmitButton from "src/components/SubmitButton";
import FormField from "src/components/FormField";
import useViewer from "src/hooks/useViewer";
import MotionCard from "../MotionCard";
import HaveAccount from "../HaveAccount";
import { useUpdatePassword } from "../queries";
import validationSchema from "./validationSchema";

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

  const handleSubmit = async (values, { setStatus }) => {
    setStatus(null);
    const res = await setPassword({ variables: { input: values } });

    if (res.errors) {
      setStatus(res.errors[0]?.message);
      return;
    }

    const nextPath = project_id
      ? `/opportunities/${project_id}`
      : nextStep.path;

    history.replace(nextPath);
  };

  return (
    <MotionCard forwards={forwards}>
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
