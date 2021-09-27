import React from "react";
import { object, array } from "yup";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import { ArrowRight } from "@styled-icons/heroicons-solid/ArrowRight";
import { ArrowLeft } from "@styled-icons/heroicons-solid/ArrowLeft";
import { Button, Box, Error, Heading } from "@advisable/donut";
import FormField from "src/components/FormField";
import CheckboxInput from "src/components/CheckboxInput";
import SubmitButton from "src/components/SubmitButton";
import Description from "../components/Description";
// Queries
import { useUpdateCaseStudySearch } from "../queries";

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

export default function EditGoals({ caseStudySearch }) {
  const [update] = useUpdateCaseStudySearch();
  const history = useHistory();

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
    history.goBack();
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      {(formik) => (
        <Form>
          {history.length > 1 && (
            <Button
              onClick={handleBack}
              type="button"
              variant="minimal"
              size="xs"
              prefix={<ArrowLeft />}
            >
              Back
            </Button>
          )}
          <Heading size="5xl" mb={2.5}>
            Goals
          </Heading>
          <Description>
            We’ll recommend you talent and projects that have helped similar
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
  );
}
