import React from "react";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import StepDots from "../StepDots";
import { Box, Text, RoundedButton, Icon } from "@advisable/donut";

const IndustryAndSkills = ({ next }) => {
  const initialValues = {};

  return (
    <Formik onSubmit={next} initialValues={initialValues}>
      {formik => (
        <form onSubmit={formik.handleSubmit}>
          <StepDots total={4} current={2} justify="left" mb="xs" />
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
          <RoundedButton type="submit" suffix={<Icon icon="arrow-right" />}>
            Continue
          </RoundedButton>
        </form>
      )}
    </Formik>
  );
};

export default IndustryAndSkills;
