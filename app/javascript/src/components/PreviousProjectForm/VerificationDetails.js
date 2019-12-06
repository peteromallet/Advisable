import React from "react";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import StepDots from "../StepDots";
import Select from "../Select";
import TextField from "../TextField";
import { Box, Text, RoundedButton, Icon } from "@advisable/donut";

const VerificationDetails = ({ values, next }) => {
  const initialValues = {};

  return (
    <Formik onSubmit={next} initialValues={initialValues}>
      {formik => (
        <form onSubmit={formik.handleSubmit}>
          <StepDots total={4} current={4} justify="left" mb="xs" />
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
          <RoundedButton type="submit" suffix={<Icon icon="arrow-right" />}>
            Continue
          </RoundedButton>
        </form>
      )}
    </Formik>
  );
};

export default VerificationDetails;
