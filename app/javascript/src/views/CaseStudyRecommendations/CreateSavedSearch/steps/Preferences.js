import React from "react";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { Box, Error } from "@advisable/donut";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import CheckboxInput from "src/components/CheckboxInput";
import Header from "../components/Header";
import StepNumber from "../components/StepNumber";
import Description from "../components/Description";
import AnimatedCard from "../components/AnimatedCard";

export default function Preferences({ id, clientApplication }) {
  const history = useHistory();

  const preferencesOptions = [
    `The company is ${clientApplication.businessType}`,
    `The company is ${clientApplication.companyType}`,
    `The company is in the ${clientApplication.industry?.name} space`,
    // `The company is in [Location]`, // We don't know a location of a client
    `The freelancer is available right now`,
    `The cost of this project is within our overall budget`,
    `The freelancer’s hourly rate is within a specific amount`,
  ];

  const initialValues = {
    preferences: [],
  };

  const handleSubmit = () => {
    history.push(`/explore/new/${id}/review`);
  };

  return (
    <AnimatedCard>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(formik) => (
          <Form>
            <StepNumber>Step 3 of 4</StepNumber>
            <Header>Preferences</Header>
            <Description>
              What’s important to you when searching for projects
            </Description>
            <Box mb={6}>
              <FormField
                as={CheckboxInput}
                name="preferences"
                options={preferencesOptions}
                optionsPerRow={1}
              />
            </Box>
            <Error>{formik.status}</Error>
            <SubmitButton
              mt={4}
              suffix={<ArrowRight />}
              disabled={formik.values.preferences.length === 0}
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
