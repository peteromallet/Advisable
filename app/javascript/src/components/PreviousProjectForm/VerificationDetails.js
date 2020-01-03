import React from "react";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import StepDots from "../StepDots";
import Select from "../Select";
import TextField from "../TextField";
import { Box, Text, RoundedButton, Checkbox, Icon } from "@advisable/donut";

const validationSchema = Yup.object({
  contactName: Yup.string().required(
    "Please provide the name of your contact on this project"
  ),
  contactJobTitle: Yup.string().required(
    "Please provide the job title of your contact on this project"
  ),
});

const RELATIONSHIPS = [
  "They managed the project",
  "They worked on the project with me",
  "They worked at the company but not the project",
];

const VerificationDetails = ({ values, next, back }) => {
  const initialValues = {
    publicUse: true,
    contactName: "",
    contactJobTitle: "",
    contactRelationship: RELATIONSHIPS[0],
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
          <StepDots total={4} current={4} justify="left" mb="xs" />
          <Text
            mb="xl"
            as="h2"
            fontSize="xxl"
            color="blue.9"
            fontWeight="semibold"
            letterSpacing="-0.035em"
          >
            Add Previous Project
          </Text>
          <Box mb="m">
            <Field
              as={TextField}
              name="contactName"
              placeholder="Contact Name"
              label="What was the name of your contact with this client?"
            />
          </Box>
          <Box mb="m">
            <Field
              as={TextField}
              name="contactJobTitle"
              label="What was their job title?"
              placeholder="e.g Head of Marketing"
            />
          </Box>
          <Box mb="m">
            <Field
              as={Select}
              name="contactRelationship"
              label="What was your relationship to them for this project?"
              options={RELATIONSHIPS}
            />
          </Box>
          <Box mb="xl">
            <Field as={Checkbox} type="checkbox" name="publicUse">
              It is okay for Advisable to use anonymised details of this project
              publicly to promote me
            </Field>
          </Box>
          <RoundedButton
            mr="xs"
            type="button"
            onClick={back}
            variant="secondary"
            prefix={<Icon icon="arrow-left" />}
          >
            Back
          </RoundedButton>
          <RoundedButton
            disabled={!formik.isValid}
            loading={formik.isSubmitting}
            type="submit"
          >
            Add Previous Project
          </RoundedButton>
        </form>
      )}
    </Formik>
  );
};

export default VerificationDetails;
