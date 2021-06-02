import React from "react";
import { Formik, Form } from "formik";
import { array, object } from "yup";
import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { Box, Combobox, Error } from "@advisable/donut";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import AnimatedCard from "../components/AnimatedCard";
import StepNumber from "../components/StepNumber";
import Header from "../components/Header";
import { useHistory } from "react-router";

export const validationSchema = object().shape({
  skills: array().min(1, "Please select at least one skill"),
});

export default function Skills({ id, skills }) {
  const history = useHistory();

  const initialValues = {
    skills: [],
  };

  const handleSubmit = () => {
    history.push(`/explore/new/${id}/goals`);
  };

  return (
    <AnimatedCard>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form>
            <StepNumber>Step 1 of 4</StepNumber>
            <Header>Skills</Header>
            <Box mb={6}>
              <FormField
                isRequired
                as={Combobox}
                multiple
                max={10}
                value={formik.values.skills}
                name="skills"
                onChange={(s) => formik.setFieldValue("skills", s)}
                label="What are the skills you're interested in?"
                placeholder="e.g Facebook Marketing"
                options={skills}
              />
            </Box>
            <Error>{formik.status}</Error>
            <SubmitButton
              mt={4}
              suffix={<ArrowRight />}
              disabled={formik.values.skills.length === 0}
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
