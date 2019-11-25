import React from "react";
import { useLocation } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Box, Text, Button, Radio, RadioGroup } from "@advisable/donut";
import TextField from "../../components/TextField";

const commaSeparated = skills => {
  if (skills.length === 1) return skills;
  if (skills.length === 2) return `${skills[0]} and ${skills[1]}`;
  const length = skills.length;
  return `${skills.slice(0, length - 1).join(", ")} and ${skills[length - 1]}`;
};

const Topic = ({ data, nextStep }) => {
  const location = useLocation();

  const initialValues = {
    topic: undefined,
    customTopic: "",
  };

  const handleSubmit = async values => {};

  return (
    <>
      <Text fontSize="s" fontWeight="medium" mb="xs" color="neutral.5">
        Step 4
      </Text>
      <Text
        mb="xs"
        as="h2"
        fontSize="xxl"
        fontWeight="semibold"
        color="blue.8"
        letterSpacing="-0.025em"
      >
        What would you like to cover with {data.specialist.firstName} during
        this consultation?
      </Text>
      <Text color="neutral.8" lineHeight="s" mb="l">
        Please describe briefly what you'd like to cover in a 30-minute
        consultation with {data.specialist.firstName}. This is for us to share
        with {data.specialist.firstName} when requesting their time.
      </Text>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {formik => (
          <Form>
            <RadioGroup mb={formik.values.topic === "OTHER" ? "m" : "xl"}>
              <Field
                type="radio"
                as={Radio}
                name="topic"
                label={`We're interested in learning more about ${commaSeparated(
                  location.state.skills
                )}`}
                value={`We're interested in learning more about ${commaSeparated(
                  location.state.skills
                )}`}
              />
              <Field
                type="radio"
                as={Radio}
                name="topic"
                label={`We're interested in talking to a ${commaSeparated(
                  location.state.skills
                )} expert`}
                value={`We're interested in talking to a ${commaSeparated(
                  location.state.skills
                )} expert`}
              />
              <Field
                type="radio"
                as={Radio}
                name="topic"
                label={`We need help figuring out our ${commaSeparated(
                  location.state.skills
                )} strategy`}
                value={`We need help figuring out our ${commaSeparated(
                  location.state.skills
                )} strategy`}
              />
              <Field
                type="radio"
                as={Radio}
                name="topic"
                label={`We need help fixing issues with our ${commaSeparated(
                  location.state.skills
                )} strategy`}
                value={`We need help fixing issues with our ${commaSeparated(
                  location.state.skills
                )} strategy`}
              />
              <Field
                type="radio"
                as={Radio}
                name="topic"
                label={`We're looking for advice on ${commaSeparated(
                  location.state.skills
                )} implementation`}
                value={`We're looking for advice on ${commaSeparated(
                  location.state.skills
                )} implementation`}
              />
              <Field
                type="radio"
                as={Radio}
                name="topic"
                label={`We're considering adding ${commaSeparated(
                  location.state.skills
                )} skills to our team`}
                value={`We're considering adding ${commaSeparated(
                  location.state.skills
                )} skills to our team`}
              />
              <Field
                type="radio"
                as={Radio}
                name="topic"
                label="Other"
                value="OTHER"
              />
            </RadioGroup>
            {formik.values.topic === "OTHER" && (
              <Box mb="l">
                <Field
                  autoFocus
                  multiline
                  as={TextField}
                  name="customTopic"
                  placeholder="What would you like to talk about..."
                />
              </Box>
            )}
            <Button appearance="primary" intent="success" onClick={nextStep}>
              Continue
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Topic;
