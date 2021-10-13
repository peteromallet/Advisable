import { Form, Formik } from "formik";
import React from "react";
import { Box, Label, Error, Text, Link } from "@advisable/donut";
import FormField from "../FormField";
import SubmitButton from "../SubmitButton";

export default function CreateAccountForm({ onSubmit, setStep }) {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(formik) => (
        <Form>
          <Label marginBottom={2}>Name</Label>
          <Box
            display="grid"
            gridTemplateColumns="1fr 1fr"
            gridGap="8px"
            marginBottom={4}
          >
            <FormField name="firstName" placeholder="First name" />
            <FormField name="lastName" placeholder="Last name" />
          </Box>
          <FormField name="email" label="Email" marginBottom={4} />
          <FormField
            name="password"
            type="password"
            label="Password"
            placeholder="Password"
            marginBottom={2}
          />
          <FormField
            name="passwordConfirmation"
            type="password"
            placeholder="Confirm password"
            marginBottom={8}
          />
          <SubmitButton size="l" width="100%" marginBottom={6}>
            Create account
          </SubmitButton>

          <Text fontWeight={500} marginBottom={1}>
            Already have an account?
          </Text>
          <Link.External
            href="#"
            variant="underlined"
            onClick={() => setStep("LOGIN")}
          >
            Login
          </Link.External>
          <Error marginTop={4}>{formik.status}</Error>
        </Form>
      )}
    </Formik>
  );
}
