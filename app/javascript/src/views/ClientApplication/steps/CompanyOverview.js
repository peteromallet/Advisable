import React from "react";
import { object, string } from "yup";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { Box, Error, Combobox } from "@advisable/donut";
import FormField from "src/components/FormField";
import TilesInput from "src/components/TilesInput";
import SubmitButton from "src/components/SubmitButton";
import AnimatedCard from "../components/AnimatedCard";
import Header from "../components/Header";
import Description from "../components/Description";
import StepNumber from "../components/StepNumber";
import { UPDATE_CLIENT_APPLICATION } from "../queries";

export const validationSchema = object().shape({
  companyName: string().required("Please enter your company name"),
  businessType: string().required("Please enter your business type"),
  industry: object().required("Please enter your company industry"),
});

export default function CompanyOverview({ clientApplication, industries }) {
  const [update] = useMutation(UPDATE_CLIENT_APPLICATION);
  const history = useHistory();

  const initialValues = {
    companyName: clientApplication.companyName || "",
    businessType: clientApplication.businessType || "",
    industry: clientApplication.industry || "",
  };

  const handleSubmit = async (values, { setStatus }) => {
    setStatus(null);
    const res = await update({
      variables: {
        input: { ...values, industry: values.industry.value },
      },
    });

    if (res.errors) {
      setStatus(res.errors[0]?.message);
      return;
    }

    history.push("/clients/apply/company-stage");
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
            <StepNumber>Step 1 of 4</StepNumber>
            <Header>Company Overview</Header>
            <Description>
              To start, we’d like to know a little bit more about your company.
            </Description>
            <Box mb={6}>
              <Box mb={6}>
                <FormField
                  name="companyName"
                  label="Company Name"
                  placeholder="Company name"
                />
              </Box>
              <Box mb={6}>
                <FormField
                  as={TilesInput}
                  fullWidth
                  alignWidth
                  optionsPerRow={2}
                  name="businessType"
                  onChange={(n) => formik.setFieldValue("businessType", n)}
                  error={null}
                  label="How would you describe your company?"
                  options={[
                    { label: "B2B", value: "B2B" },
                    { label: "B2C", value: "B2C" },
                  ]}
                  value={formik.values.businessType}
                />
              </Box>
              <Box mb={6}>
                <FormField
                  name="industry"
                  as={Combobox}
                  autoComplete="off"
                  options={industries}
                  onChange={(i) => formik.setFieldValue("industry", i)}
                  placeholder="Select your company industry"
                  label="What industry is your company in?"
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
