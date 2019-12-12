import React from "react";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import Select from "../Select";
import StepDots from "../StepDots";
import TextField from "../TextField";
import { Box, Text, Checkbox, RoundedButton, Icon } from "@advisable/donut";

const validationSchema = Yup.object({
  clientName: Yup.string().required("Please enter the clients name"),
});

const ClientDetails = ({ next, values }) => {
  const initialValues = {
    clientName: "",
    companyType: "Individual Entrepreneur",
    confidential: false,
    ...values,
  };

  return (
    <Formik
      onSubmit={next}
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount
    >
      {formik => (
        <form onSubmit={formik.handleSubmit}>
          <StepDots total={4} current={1} justify="left" mb="xs" />
          <Text
            mb="xs"
            as="h2"
            fontSize="xxl"
            color="blue.9"
            fontWeight="semibold"
            letterSpacing="-0.035em"
          >
            Add Previous Project
          </Text>
          <Text fontSize="s" lineHeight="s" color="neutral.7" mb="l">
            Previous projects are one of the most effective ways to validate
            your skills. Advisable uses them to decide what projects to invite
            you to.
          </Text>
          <Box mb="m">
            <Field
              as={TextField}
              name="clientName"
              label="Client Name"
              placeholder="e.g Acme Corp"
              error={formik.touched.clientName && formik.errors.clientName}
            />
          </Box>
          <Box mb="m">
            <Field
              as={Select}
              name="companyType"
              label="What type of company is this?"
              options={[
                "Individual Entrepreneur",
                "Small Business",
                "Medium-Sized Business",
                "Startup",
                "Growth-Stage Startup",
                "Major Corporation",
                "Non-Profit",
                "Education Institution",
                "Government",
              ]}
            />
          </Box>
          <Field as={Checkbox} type="checkbox" name="confidential" mb="xl">
            <Text fontSize="s" fontWeight="medium" color="neutral.9" mb="xxs">
              This client is confidential
            </Text>
            <Text fontSize="xs" lineHeight="xs" color="neutral.6">
              If checked this client’s name will be hidden and then industry
              will be named instead e.g ‘Financial Services Company’
            </Text>
          </Field>
          <RoundedButton
            type="submit"
            disabled={!formik.isValid}
            loading={formik.isSubmitting}
            suffix={<Icon icon="arrow-right" />}
          >
            Continue
          </RoundedButton>
        </form>
      )}
    </Formik>
  );
};

export default ClientDetails;
