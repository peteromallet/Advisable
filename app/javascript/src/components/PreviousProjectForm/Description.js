import React from "react";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import StepDots from "../StepDots";
import Select from "../Select";
import TextField from "../TextField";
import { Box, Text, RoundedButton, Icon } from "@advisable/donut";

const Description = ({ values, next }) => {
  const initialValues = {};

  return (
    <Formik onSubmit={next} initialValues={initialValues}>
      {formik => (
        <form onSubmit={formik.handleSubmit}>
          <StepDots total={4} current={3} justify="left" mb="xs" />
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
          <Box mb="m">
            <Field
              as={Select}
              name="goal"
              label="What was your primary goal for this project?"
              options={["Generate Leads"]}
            />
          </Box>
          <Box mb="l">
            <Field
              as={TextField}
              name="description"
              label={`Please provide the problem ${values.clientName} had, an overview of the project, how you approached it and the results you achieved`}
              maxLength={200}
              placeholder="Project overview..."
              multiline
              autoHeight
              minRows={5}
              description={`This will be need to be validated by ${values.clientName} and will be seen by potential clients when you’re applying for projects on Advisable. Please provide as specific information as possible about the results of this project. Include URLs and examples of work where possible.`}
            />
          </Box>
          <RoundedButton type="submit" suffix={<Icon icon="arrow-right" />}>
            Continue
          </RoundedButton>
        </form>
      )}
    </Formik>
  );
};

export default Description;
