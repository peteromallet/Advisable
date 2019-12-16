import * as Yup from "yup";
import React, { useState } from "react";
import { Formik, Field } from "formik";
import { motion } from "framer-motion";
import StepDots from "../StepDots";
import Select from "../Select";
import TextField from "../TextField";
import DescriptionProgress from "./DescriptionProgress";
import { Box, Text, RoundedButton, Icon } from "@advisable/donut";

const validationSchema = Yup.object({
  description: Yup.string()
    .required("Please provide a description of this project")
    .min(140, "Must be at least 140 characters long"),
});

const Description = ({ values, next, back }) => {
  const initialValues = {
    goal: "Generate Leads",
    description: "",
    ...values,
  };

  const [otherGoal, setOtherGoal] = useState(false);

  const handleGoalChange = formik => e => {
    if (e.target.value === "Other") {
      setOtherGoal(true);
      formik.setFieldValue("goal", "");
    } else {
      setOtherGoal(false);
      formik.handleChange(e);
    }
  };

  return (
    <Formik
      onSubmit={next}
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount
    >
      {formik => {
        const progress = (formik.values.description.length / 140) * 100;
        const percentage = progress >= 100 ? 100 : progress;

        return (
          <form onSubmit={formik.handleSubmit}>
            <StepDots total={4} current={3} justify="left" mb="xs" />
            <Text
              mb="l"
              as="h2"
              fontSize="xxl"
              color="blue.9"
              fontWeight="semibold"
              letterSpacing="-0.035em"
            >
              Add Previous Project
            </Text>
            <Box mb="l">
              <Field
                as={Select}
                name="goal"
                label="What was your primary goal for this project?"
                onChange={handleGoalChange(formik)}
                value={otherGoal ? "Other" : formik.values.goal}
                options={[
                  "Generate Leads",
                  "Launch product",
                  "Rebrand/reposition",
                  "Increase brand awareness",
                  "Improve conversion",
                  "Improve retention",
                  "Increase web traffic",
                  "Other",
                ]}
              />
              {otherGoal && (
                <Box mt="xs">
                  <Field
                    autoFocus
                    multiline
                    minRows={3}
                    name="goal"
                    maxLength={100}
                    as={TextField}
                    placeholder="What was your goal for this project..."
                  />
                </Box>
              )}
            </Box>
            <Box mb="l">
              <Field
                as={TextField}
                name="description"
                label={`Please provide the problem ${values.clientName} had, an overview of the project, how you approached it and the results you achieved`}
                placeholder="Project overview..."
                multiline
                autoHeight
                minRows={5}
                description={`This will be need to be validated by ${values.clientName} and will be seen by potential clients when you’re applying for projects on Advisable. Please provide as specific information as possible about the results of this project. Include URLs and examples of work where possible.`}
              />
            </Box>
            <Box mb="l">
              <DescriptionProgress percentage={percentage}>
                {formik.values.description.length} / 140
              </DescriptionProgress>
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
              type="submit"
              as={motion.button}
              disabled={!formik.isValid}
              suffix={<Icon icon="arrow-right" />}
              animate={{
                x: percentage === 100 ? 0 : 20,
                opacity: percentage === 100 ? 1 : 0,
              }}
            >
              Continue
            </RoundedButton>
          </form>
        );
      }}
    </Formik>
  );
};

export default Description;
