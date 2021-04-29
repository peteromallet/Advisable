import React from "react";
import { object, array } from "yup";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { Box, Error, Combobox } from "@advisable/donut";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import AnimatedCard from "../components/AnimatedCard";
import Header from "../components/Header";
import Description from "../components/Description";
import StepNumber from "../components/StepNumber";
import { UPDATE_CLIENT_APPLICATION } from "../queries";

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

export default function CompanyOverview({ clientApplication }) {
  const [update] = useMutation(UPDATE_CLIENT_APPLICATION);
  const history = useHistory();

  const initialValues = {
    goals: clientApplication.goals.map((g) => ({ value: g, label: g })) || [],
  };

  const handleSubmit = async (values, { setStatus }) => {
    setStatus(null);
    const res = await update({
      variables: { input: { goals: values.goals.map((g) => g.value) } },
    });

    if (res.errors) {
      setStatus(res.errors[0]?.message);
      return;
    }

    history.push("/clients/apply/preferences");
  };

  return (
    <AnimatedCard>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <StepNumber>Step 3 of 4</StepNumber>
            <Header>Goals</Header>
            <Description>Some description</Description>
            <Box mb={6}>
              <Box mb={6}>
                <FormField
                  isRequired
                  name="goals"
                  as={Combobox}
                  multiple
                  options={GOALS.map((g) => ({ value: g, label: g }))}
                  onChange={(g) => formik.setFieldValue("goals", g)}
                  placeholder="Select your goals"
                  label="What goals do you want to achieve"
                />
              </Box>
            </Box>
            <Error>{formik.status}</Error>
            <SubmitButton
              mt={4}
              suffix={<ArrowRight />}
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
