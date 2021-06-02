import React from "react";
import { object, array } from "yup";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { Box, Error } from "@advisable/donut";
import FormField from "src/components/FormField";
import CheckboxInput from "src/components/CheckboxInput";
import SubmitButton from "src/components/SubmitButton";
import AnimatedCard from "../components/AnimatedCard";
import Header from "../components/Header";
import Description from "../components/Description";
import StepNumber from "../components/StepNumber";

export const validationSchema = object().shape({
  goals: array().min(1, "Please add at least one goal"),
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

export default function Goals({ id }) {
  const history = useHistory();

  const initialValues = {
    goals: [],
  };

  const handleSubmit = () => {
    history.push(`/explore/new/${id}/preferences`);
  };

  return (
    <AnimatedCard>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {(formik) => (
          <Form>
            <StepNumber>Step 3 of 4</StepNumber>
            <Header>Goals</Header>
            <Description>
              We’ll recommend you talent & projects that have helped similar
              companies achieve the goals you select.
            </Description>
            <Box mb={6}>
              <FormField
                as={CheckboxInput}
                name="goals"
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
