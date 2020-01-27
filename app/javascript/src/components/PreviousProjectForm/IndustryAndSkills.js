import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import StepDots from "../StepDots";
import { motion } from "framer-motion";
import { Box, Text, RoundedButton, Icon, Autocomplete } from "@advisable/donut";

const validationSchema = Yup.object({
  industries: Yup.array().min(1, "Please select at lease one industry"),
  skills: Yup.array().min(1, "Please select at lease one skill"),
});

const IndustryAndSkills = ({ data, values, next, back }) => {
  const initialValues = {
    industries: [],
    primaryIndustry: undefined,
    skills: [],
    primarySkill: undefined,
    ...values,
  };

  const handleSubmit = values => {
    next(values);
  };

  const industryOptions = data.industries.map(industry => ({
    value: industry.name,
    label: industry.name,
  }));

  const skillOptions = data.skills.map(skill => ({
    value: skill.name,
    label: skill.name,
  }));

  return (
    <Formik
      validateOnMount
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {formik => (
        <Form>
          <StepDots total={4} current={2} justify="left" mb="xs" />
          <Text
            as="h2"
            mb="xl"
            fontSize="xxl"
            color="blue.9"
            fontWeight="semibold"
            letterSpacing="-0.035em"
          >
            Add Previous Project
          </Text>
          <Autocomplete
            mb="l"
            multiple
            max={3}
            options={industryOptions}
            placeholder="e.g Financial Services"
            label={`What industries does ${formik.values.clientName} work in?`}
            error={formik.touched.industries && formik.errors.industries}
            primary={formik.values.primaryIndustry}
            onPrimaryChange={primary => {
              setTimeout(() => {
                formik.setFieldValue("primaryIndustry", primary);
              }, 5);
            }}
            value={formik.values.industries}
            onChange={industries => {
              formik.handleChange({
                target: {
                  name: "industries",
                  value: industries,
                },
              });
            }}
            description={
              formik.values.primaryIndustry && (
                <>
                  You have selected{" "}
                  <Text
                    as="span"
                    fontSize="xs"
                    color="neutral.7"
                    fontWeight="medium"
                  >
                    {formik.values.primaryIndustry}
                  </Text>{" "}
                  as the primary industry. The primary industry is the industry
                  that best describes {formik.values.clientName}’s industry.
                </>
              )
            }
          />
          <Autocomplete
            max={5}
            multiple
            options={skillOptions}
            placeholder="e.g Facebook Marketing"
            label="What skills did you use for this project?"
            error={formik.touched.skills && formik.errors.skills}
            primary={formik.values.primarySkill}
            onPrimaryChange={primary => {
              setTimeout(() => {
                formik.setFieldValue("primarySkill", primary);
              }, 5);
            }}
            value={formik.values.skills}
            onChange={skills => {
              formik.handleChange({
                target: {
                  name: "skills",
                  value: skills,
                },
              });
            }}
            description={
              formik.values.primarySkill && (
                <>
                  You have selected{" "}
                  <Text
                    fontWeight="medium"
                    color="neutral.7"
                    as="span"
                    fontSize="xs"
                  >
                    {formik.values.primarySkill}
                  </Text>{" "}
                  as the primary skill. The primary skill is the skill that you
                  used to most throughout this project.
                </>
              )
            }
          />
          <Box height={1} bg="neutral.1" mt="xl" mb="l" />
          <RoundedButton
            mr="xs"
            type="button"
            onClick={back}
            as={motion.button}
            variant="secondary"
            prefix={<Icon icon="arrow-left" />}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 100, opacity: 1 }}
          >
            Back
          </RoundedButton>
          <RoundedButton
            type="submit"
            disabled={!formik.isValid}
            suffix={<Icon icon="arrow-right" />}
          >
            Continue
          </RoundedButton>
        </Form>
      )}
    </Formik>
  );
};

export default IndustryAndSkills;
