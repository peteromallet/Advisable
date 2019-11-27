import * as Yup from "yup";
import React from "react";
import { useMutation } from "react-apollo";
import { useParams, useLocation } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import {
  Icon,
  Box,
  Text,
  RoundedButton,
  Radio,
  RadioGroup,
} from "@advisable/donut";
import TextField from "../../components/TextField";
import REQUEST_CONSULTATION from "./requestConsultation";

const validationSchema = Yup.object({
  topic: Yup.string().required(),
  customTopic: Yup.string().when("topic", {
    is: "OTHER",
    then: Yup.string().required(),
  }),
});

const commaSeparated = skills => {
  if (skills.length === 1) return skills;
  if (skills.length === 2) return `${skills[0]} and ${skills[1]}`;
  const length = skills.length;
  return `${skills.slice(0, length - 1).join(", ")} and ${skills[length - 1]}`;
};

const Topic = ({ data, nextStep }) => {
  const { specialistId } = useParams();
  const location = useLocation();
  const [requestConsultation] = useMutation(REQUEST_CONSULTATION);

  const initialValues = {
    topic: undefined,
    customTopic: "",
  };

  const handleSubmit = async values => {
    await requestConsultation({
      variables: {
        input: {
          ...location.state,
          specialist: specialistId,
          topic: values.topic === "OTHER" ? values.customTopic : values.topic,
        },
      },
    });

    nextStep();
  };

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
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        isInitialValid={validationSchema.isValidSync(initialValues)}
      >
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
            <RoundedButton
              type="submit"
              width={["100%", "auto"]}
              disabled={!formik.isValid}
              loading={formik.isSubmitting}
              suffix={<Icon icon="arrow-right" />}
            >
              Continue
            </RoundedButton>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Topic;
