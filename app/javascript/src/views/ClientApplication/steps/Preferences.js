import React from "react";
import { object, string, boolean } from "yup";
import { Formik, Form, Field } from "formik";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import TilesInput from "src/components/TilesInput";
import { Label, Box, Error, RadioGroup, Radio } from "@advisable/donut";
import FormField from "src/components/FormField";
import CurrencyInput from "src/components/CurrencyInput";
import SubmitButton from "src/components/SubmitButton";
import AnimatedCard from "../components/AnimatedCard";
import Header from "../components/Header";
import Description from "../components/Description";
import StepNumber from "../components/StepNumber";
import {
  UPDATE_CLIENT_APPLICATION,
  SUBMIT_CLIENT_APPLICATION,
} from "../queries";

export const validationSchema = object().shape({
  title: string().required("Please enter your role at the company"),
  budget: string().required(),
  feedback: boolean().required(),
  marketingAttitude: string().required(
    "Please select your type of marketing attitude",
  ),
});

export default function CompanyOverview({ clientApplication }) {
  const [update] = useMutation(UPDATE_CLIENT_APPLICATION);
  const [submit] = useMutation(SUBMIT_CLIENT_APPLICATION);
  const history = useHistory();

  const initialValues = {
    title: clientApplication.title || "",
    budget: clientApplication.budget / 100 || "",
    feedback: clientApplication.feedback || undefined,
    marketingAttitude: clientApplication.marketingAttitude || "",
  };

  const handleSubmit = async (values, { setStatus }) => {
    setStatus(null);
    const res = await update({
      variables: {
        input: { ...values, budget: values.budget * 100 },
      },
    });

    if (res.errors) {
      setStatus(res.errors[0]?.message);
      return;
    }

    if (clientApplication.status === "Application Started") {
      await submit({ variables: { input: {} } });
    }

    history.push("/");
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
            <StepNumber>Step 4 of 4</StepNumber>
            <Header>Preferences</Header>
            <Description>
              This will help us understand whether your company is a good fit
              for Advisable.
            </Description>
            <Box mb={6}>
              <Box mb={6}>
                <FormField
                  name="title"
                  label="What is your role at the company?"
                  placeholder="Your role"
                />
              </Box>
              <Box mb={6}>
                <FormField
                  as={CurrencyInput}
                  name="budget"
                  prefix="$"
                  suffix="yearly"
                  placeholder="Enter your estimated spend"
                  label="What’s your company’s estimated annual marketing budget?"
                  data-testid="budget"
                />
              </Box>
              <Box mb={6}>
                <FormField
                  as={TilesInput}
                  fullWidth
                  alignWidth
                  optionsPerRow={2}
                  name="feedback"
                  onChange={(n) => formik.setFieldValue("feedback", n)}
                  error={null}
                  label="Are you open to giving feedback on your experience with Advisable"
                  options={[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ]}
                  value={formik.values.feedback}
                />
              </Box>
              <Label mb={3}>
                How would you describe your company’s attitude to marketing?
              </Label>
              <RadioGroup>
                <Field
                  as={Radio}
                  type="radio"
                  name="marketingAttitude"
                  value="We rarely experiment & try new things"
                  description="We rarely experiment & try new things"
                />
                <Field
                  as={Radio}
                  type="radio"
                  name="marketingAttitude"
                  value="We sometimes test new strategies & tactics"
                  description="We sometimes test new strategies & tactics"
                />
                <Field
                  as={Radio}
                  type="radio"
                  name="marketingAttitude"
                  value="We’re constantly looking for opportunities"
                  description="We’re constantly looking for opportunities"
                />
              </RadioGroup>
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
