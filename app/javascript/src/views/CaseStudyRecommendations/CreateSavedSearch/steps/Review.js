import React from "react";
import { Formik, Form } from "formik";
import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { Error } from "@advisable/donut";
import SubmitButton from "src/components/SubmitButton";
import AnimatedCard from "../components/AnimatedCard";
import StepNumber from "../components/StepNumber";
import Header from "../components/Header";
import { useHistory } from "react-router";

export default function Review({ id }) {
  const history = useHistory();

  const initialValues = {
    skills: [],
  };

  const handleSubmit = () => {
    history.push(`/explore/${id}`);
  };

  return (
    <AnimatedCard>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {(formik) => (
          <Form>
            <StepNumber>Step 4 of 4</StepNumber>
            <Header>Review</Header>
            <Error>{formik.status}</Error>
            <SubmitButton
              mt={4}
              suffix={<ArrowRight />}
              variant="gradient"
              size="l"
            >
              Submit
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </AnimatedCard>
  );
}
