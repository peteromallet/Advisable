import { object, string, ref } from "yup";
import { Form, Formik } from "formik";
import React from "react";
import { Box, Label, Error, Text, Link } from "@advisable/donut";
import FormField from "../FormField";
import SubmitButton from "../SubmitButton";

const validationSchema = object({
  firstName: string().required("Please enter your first name"),
  lastName: string().required("Please enter your last name"),
  email: string()
    .required("Please enter your email")
    .email("Please enter a valid email address"),
  password: string()
    .required("Please enter your password")
    .min(8, "Password must be at least 8 characters long"),
  passwordConfirmation: string()
    .oneOf([ref("password"), null], "Password does not match")
    .required("Please confirm your password"),
});

export default function CreateAccountForm({ onSubmit, setStep }) {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
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
          <SubmitButton size="l" width="100%">
            Create account
          </SubmitButton>
          <Error marginTop={4}>{formik.status}</Error>
        </Form>
      )}
    </Formik>
  );
}
