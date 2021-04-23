import React from "react";
import { Form, Formik } from "formik";
import { useHistory } from "react-router";
import { ChevronRight } from "@styled-icons/feather/ChevronRight";
import { Box, Text, Input, Error, useBreakpoint } from "@advisable/donut";
import SubmitButton from "src/components/SubmitButton";
import FormField from "src/components/FormField";
import useViewer from "src/hooks/useViewer";
import validationSchema from "./validationSchema";
import HaveAccount from "../HaveAccount";
import MotionCard from "../MotionCard";
import { CardHeader } from "../styles";
import { useCreateClientAccount } from "../queries";

export default function StartApplication({ nextStep, forwards }) {
  const viewer = useViewer();
  const history = useHistory();
  const isWideScreen = useBreakpoint("sUp");
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

    history.push(nextStep.path);
  };

  return (
    <MotionCard forwards={forwards}>
      <>
        <Box mb={[0, 8]}>
          <CardHeader>
            Apply to gain access to our our network of top freelancers
          </CardHeader>
          {isWideScreen ? (
            <Text as="p" color="neutral800" fontSize="m" lineHeight="m">
              Enter your details now to get started.
            </Text>
          ) : null}
        </Box>
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
                    placeholder="Dwight"
                    label="First Name"
                  />
                </Box>
                <Box mb={4} width="100%">
                  <FormField
                    as={Input}
                    name="lastName"
                    size={["sm", "md"]}
                    placeholder="Schrutt"
                    label="Last Name"
                  />
                </Box>
              </Box>
              <Box mb={[4, 5]}>
                <FormField
                  as={Input}
                  name="email"
                  size={["sm", "md"]}
                  placeholder="dwight@dundermifflin.com"
                  label="Email"
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
                  suffix={<ChevronRight />}
                  mb={{ _: 3, m: 0 }}
                >
                  Get Started
                </SubmitButton>
                <HaveAccount />
              </Box>
            </Form>
          )}
        </Formik>
      </>
    </MotionCard>
  );
}
