import React from "react";
import { object, array } from "yup";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { ArrowRight } from "@styled-icons/heroicons-solid/ArrowRight";
import { ArrowLeft } from "@styled-icons/heroicons-solid/ArrowLeft";
import { Button, Box, Error } from "@advisable/donut";
import Heading from "src/components/Heading";
import FormField from "src/components/FormField";
import CheckboxInput from "src/components/CheckboxInput";
import SubmitButton from "src/components/SubmitButton";
import AnimatedCard from "../components/AnimatedCard";
import Description from "../components/Description";
// Queries
import UPDATE_CASE_STUDY_SEARCH from "../queries/updateCaseStudySearch.gql";

export const validationSchema = object().shape({
  goals: array().min(1, "Please add at least one goal").required(),
});

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

export default function Goals({ caseStudySearch }) {
  const history = useHistory();
  const [update] = useMutation(UPDATE_CASE_STUDY_SEARCH);

  const initialValues = {
    goals: caseStudySearch.goals || [],
  };

  const handleSubmit = async (values, { setStatus }) => {
    setStatus(null);

    const res = await update({
      variables: {
        input: {
          id: caseStudySearch.id,
          ...values,
        },
      },
    });

    if (res.errors) {
      setStatus("Something went wrong, please try again");
      return;
    }

    history.push(`/explore/${caseStudySearch.id}/preferences`);
  };

  const handleBack = () => {
    history.push(`/explore/${caseStudySearch.id}/skills`);
  };

  return (
    <AnimatedCard>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {(formik) => (
          <Form>
            <Button
              onClick={handleBack}
              type="button"
              variant="minimal"
              size="xs"
              prefix={<ArrowLeft />}
            >
              Back
            </Button>
            <Heading mb={2.5}>Goals</Heading>
            <Description>
              We’ll recommend you talent & projects that have helped similar
              companies achieve the goals you select.
            </Description>
            <Box mb={6}>
              <FormField
                as={CheckboxInput}
                name="goals"
                environment="body"
                options={GOALS}
                optionsPerRow={2}
              />
            </Box>
            <Error>{formik.status}</Error>
            <SubmitButton
              mt={4}
              suffix={<ArrowRight />}
              disabled={formik.values.goals.length === 0}
              variant="gradient"
              size="l"
            >
              Continue
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </AnimatedCard>
  );
}
