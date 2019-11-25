import React from "react";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Box, Text, Button } from "@advisable/donut";
import TextField from "../../components/TextField";

const validationSchema = Yup.object({
  name: Yup.string().required("Please enter your full name"),
  email: Yup.string()
    .required("Please enter your email")
    .email(),
  company: Yup.string().required("Please enter your company name"),
});

const CompanyInformation = ({ data, nextStep }) => {
  const location = useLocation();

  const initialValues = {
    name: location.state.name || "",
    email: location.state.email || "",
    company: location.state.company || "",
  };

  const handleSubmit = async values => {
    nextStep({
      state: {
        ...location.state,
        ...values,
      },
    });
  };

  return (
    <>
      <Text fontSize="s" fontWeight="medium" mb="xs" color="neutral.5">
        Step 2
      </Text>
      <Text
        mb="xs"
        as="h2"
        fontSize="xxl"
        fontWeight="semibold"
        color="blue.8"
        letterSpacing="-0.025em"
      >
        Company Information
      </Text>
      <Text color="neutral.8" lineHeight="s" mb="l">
        This is some sub text to support the required action for this step. For
        aesthetic reasons it should span more than one line.
      </Text>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {formik => (
          <Form>
            <Box mb="m">
              <Field
                name="name"
                as={TextField}
                label="Full Name"
                placeholder="Full Name"
                error={formik.touched.name ? formik.errors.name : null}
              />
            </Box>
            <Box mb="m">
              <Field
                name="email"
                as={TextField}
                label="Email Address"
                placeholder="Email Address"
                error={formik.touched.email ? formik.errors.email : null}
              />
            </Box>
            <Box mb="l">
              <Field
                name="company"
                as={TextField}
                label="Company Name"
                placeholder="Company Name"
                error={formik.touched.company ? formik.errors.company : null}
              />
            </Box>
            <Button type="submit" intent="success" appearance="primary">
              Continue
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CompanyInformation;
