import React from "react";
import { Formik, Form } from "formik";
import { ArrowSmRight } from "@styled-icons/heroicons-solid";
import { Redirect, useHistory, useLocation } from "react-router";
import { Heading, Box, Text } from "@advisable/donut";
import FormField from "src/components/FormField";
import CheckboxInput from "src/components/CheckboxInput";
import SubmitButton from "src/components/SubmitButton";
import BackButton from "src/components/BackButton";

const GOALS = [
  "Generate Leads",
  "Increase Brand Awareness",
  "Improve Conversion",
  "Rebranding",
  "Increase Web Traffic",
  "Improve Retention",
  "Improve Profitability",
  "Improve Processes",
  "Analyse Existing Activities",
  "Improve Efficiency",
];

export default function ShortlistGoals() {
  const history = useHistory();
  const location = useLocation();
  const articles = location?.state?.articles || [];
  const skillCategory = location?.state?.skillCategory;

  if (articles.length === 0) {
    return <Redirect to={`/explore/new/${skillCategory}`} />;
  }

  const handleSubmit = (values) => {
    const state = { ...location.state, goals: values.goals };
    history.replace({ ...location, state });

    history.push({
      state,
      pathname: "/explore/new/preferences",
    });
  };

  const initialValues = {
    goals: location.state?.goals || [],
  };

  return (
    <>
      <BackButton
        marginBottom={4}
        to={{
          ...location,
          pathname: `/explore/new/${skillCategory}`,
        }}
      />
      <Heading
        fontSize="6xl"
        letterSpacing="-0.04em"
        marginBottom={3}
        lineHeight="40px"
      >
        Do you have any specific goals?
      </Heading>
      <Box maxWidth="680px" marginBottom={8}>
        <Text fontSize="lg" lineHeight="24px">
          We’ll recommend you freelancers that have helped similar companies
          achieve the goals you select.
        </Text>
      </Box>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form>
          <Box mb={6}>
            <FormField
              as={CheckboxInput}
              name="goals"
              environment="body"
              options={GOALS}
              optionsPerRow={2}
            />
          </Box>
          <SubmitButton
            mt={4}
            variant="gradient"
            size="l"
            suffix={<ArrowSmRight />}
          >
            Continue
          </SubmitButton>
        </Form>
      </Formik>
    </>
  );
}
